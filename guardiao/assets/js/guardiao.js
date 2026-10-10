// Guardião da Floresta — página oficial: vídeos sob demanda, reações, lendas, trailer e medição anônima.
(function () {
  "use strict";
  var doc = document.documentElement;
  var I = {};
  try { I = JSON.parse(document.getElementById("g-i18n").textContent); } catch (e) {}
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var store = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
    lget: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    lset: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  // ---------- medição anônima (PostHog via sendBeacon, sem cookies) ----------
  var params = new URLSearchParams(location.search);
  var utm = {};
  ["utm_source", "utm_medium", "utm_campaign"].forEach(function (k) {
    var v = params.get(k) || store.get(k);
    if (v) { utm[k] = v.slice(0, 60); store.set(k, utm[k]); }
  });
  var sid = store.get("g_sid") || ((window.crypto && crypto.randomUUID && crypto.randomUUID()) || "a" + Date.now() + Math.random().toString(36).slice(2));
  store.set("g_sid", sid);
  function track(event, props) {
    var key = doc.dataset.ph;
    if (!key || !navigator.sendBeacon || /localhost|127\.0\.0\.1/.test(location.hostname)) return;
    var p = { lang: doc.dataset.lang, stage: doc.dataset.stage, $current_url: location.href, $process_person_profile: false };
    for (var k in utm) p[k] = utm[k];
    if (document.referrer && document.referrer.indexOf(location.host) < 0) { try { p.ref_domain = new URL(document.referrer).hostname; } catch (e) {} }
    for (var j in props || {}) p[j] = props[j];
    try {
      navigator.sendBeacon((doc.dataset.phHost || "https://us.i.posthog.com") + "/capture/",
        new Blob([JSON.stringify({ api_key: key, event: event, distinct_id: sid, properties: p })], { type: "application/json" }));
    } catch (e) {}
  }
  track("guardiao_viewed");

  // Links da Play levam a origem da visita (relatório de aquisição do Play Console)
  var src = utm.utm_source || "site";
  document.querySelectorAll("a[data-play]").forEach(function (a) {
    var ref = "utm_source=" + encodeURIComponent(src) + "&utm_medium=" + encodeURIComponent(utm.utm_medium || "botao") + "&utm_campaign=" + encodeURIComponent(utm.utm_campaign || "pagina");
    a.href = a.href.replace(/&referrer=[^&]*/, "") + "&referrer=" + encodeURIComponent(ref);
  });
  document.addEventListener("click", function (ev) {
    var el = ev.target.closest && ev.target.closest("[data-cta]");
    if (el) track("guardiao_cta_clicked", { cta: el.dataset.cta, location: el.dataset.where || "" });
    var lg = ev.target.closest && ev.target.closest("a[data-lang]");
    if (lg) { store.lset("g_lang", lg.dataset.lang); track("guardiao_language_changed", { to: lg.dataset.lang }); }
  });

  // iPhone/iPad: o jogo é só para Android; avisa antes de pedir o convite
  var ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (ios) {
    doc.classList.add("ios");
    document.querySelectorAll(".ios-note").forEach(function (n) { n.hidden = false; });
    track("guardiao_ios_seen");
  }

  // ---------- barra do topo ----------
  var bar = document.querySelector(".topbar");
  var onScroll = function () { if (bar) bar.classList.toggle("solid", scrollY > 40); };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  // fecha o menu de idioma ao clicar fora
  document.addEventListener("click", function (ev) {
    document.querySelectorAll("details.lang[open]").forEach(function (d) { if (!d.contains(ev.target)) d.removeAttribute("open"); });
  });

  // ---------- vídeos em laço: carregam e tocam só quando aparecem ----------
  function load(v) {
    if (!v.getAttribute("src") && v.dataset.src) { v.src = v.dataset.src; }
  }
  function play(v) {
    if (reduce || saveData) return;
    load(v);
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  }
  var loops = [].slice.call(document.querySelectorAll(".vid video[data-src]"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting && !v.closest("[hidden]")) play(v); else if (!v.paused) v.pause();
      });
    }, { rootMargin: "200px 0px", threshold: 0.15 });
    loops.forEach(function (v) { io.observe(v); });
  } else loops.forEach(play);

  // herói: versão alta no celular em pé, larga no resto
  var hv = document.querySelector(".hero-media video");
  if (hv) {
    var tall = matchMedia("(max-aspect-ratio: 4/5)").matches;
    if (tall) hv.poster = hv.dataset.posterTall;
    if (!reduce && !saveData) {
      var start = function () { hv.src = tall ? hv.dataset.tall : hv.dataset.wide; var p = hv.play(); if (p && p.catch) p.catch(function () {}); };
      if (document.readyState === "complete") setTimeout(start, 150); else addEventListener("load", function () { setTimeout(start, 150); });
    }
  }

  // ---------- reações: escolha dois elementos ----------
  var els = [].slice.call(document.querySelectorAll(".el"));
  var cards = [].slice.call(document.querySelectorAll(".react-card"));
  var chips = [].slice.call(document.querySelectorAll(".chip"));
  var eq = document.querySelector(".react-eq");
  // ordem de toque: o primeiro é o mais antigo, o que sai quando entra um novo
  var picked = ["fire", "ice"];
  var iconOf = function (id) { var b = document.querySelector('.el[data-el="' + id + '"] svg'); return b ? b.outerHTML : ""; };
  function renderPick() {
    els.forEach(function (b) { b.setAttribute("aria-pressed", picked.indexOf(b.dataset.el) >= 0 ? "true" : "false"); });
    if (!eq) return;
    eq.querySelector('[data-slot="0"]').innerHTML = iconOf(picked[0]);
    eq.querySelector('[data-slot="1"]').innerHTML = picked[1] ? iconOf(picked[1]) : "";
  }
  // pair: ordem dos elementos a mostrar; sem ela (chips), usa a ordem da própria reação
  function showReaction(id, user, pair) {
    var shown = null;
    cards.forEach(function (c) {
      var on = c.dataset.reaction === id;
      if (on) { c.hidden = false; shown = c; } else { c.hidden = true; var v = c.querySelector("video"); if (v) v.pause(); }
    });
    chips.forEach(function (ch) { ch.setAttribute("aria-current", ch.dataset.show === id ? "true" : "false"); });
    if (shown) {
      picked = pair || shown.dataset.pair.split(",");
      renderPick();
      var v = shown.querySelector("video"); if (v) { try { v.currentTime = 0; } catch (e) {} play(v); }
      if (eq) {
        var r = eq.querySelector(".result");
        r.textContent = (I.reactions || {})[id] || "";
        r.classList.remove("wait");
        r.style.setProperty("--rc", getComputedStyle(shown).getPropertyValue("--rc"));
        r.classList.remove("pop"); void r.offsetWidth; r.classList.add("pop");
      }
      if (user) track("guardiao_reaction_tried", { reaction: id });
    }
  }
  function reactionFor(a, b) {
    for (var i = 0; i < cards.length; i++) {
      var p = cards[i].dataset.pair.split(",");
      if ((p[0] === a && p[1] === b) || (p[0] === b && p[1] === a)) return cards[i].dataset.reaction;
    }
    return null;
  }
  els.forEach(function (b) {
    b.addEventListener("click", function () {
      var id = b.dataset.el, at = picked.indexOf(id);
      if (at >= 0) {
        // tocar num escolhido o desmarca; a reação atual fica na tela até completar o par de novo
        if (picked.length < 2) return;
        picked = [picked[1 - at]];
        renderPick();
        if (eq) { var res = eq.querySelector(".result"); res.textContent = "?"; res.classList.add("wait"); res.classList.remove("pop"); }
        return;
      }
      var pair = picked.length < 2 ? [picked[0], id] : [picked[1], id]; // completa o par ou troca o mais antigo
      var r = reactionFor(pair[0], pair[1]);
      if (r) showReaction(r, true, pair);
    });
  });
  chips.forEach(function (ch) { ch.addEventListener("click", function () { showReaction(ch.dataset.show, true); }); });
  if (cards.length) showReaction("vapor", false);

  // ---------- lendas: abas ----------
  var tabs = [].slice.call(document.querySelectorAll(".legend-tab"));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (!panel) return;
      panel.hidden = !on;
      var v = panel.querySelector("video");
      if (v) { if (on) play(v); else v.pause(); }
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectTab(t); track("guardiao_legend_viewed", { legend: t.dataset.legend }); });
    t.addEventListener("keydown", function (ev) {
      var k = ev.key, n = null;
      if (k === "ArrowRight" || k === "ArrowDown") n = tabs[(i + 1) % tabs.length];
      else if (k === "ArrowLeft" || k === "ArrowUp") n = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (k === "Home") n = tabs[0];
      else if (k === "End") n = tabs[tabs.length - 1];
      if (n) { ev.preventDefault(); selectTab(n, true); }
    });
  });

  // ---------- trailer ----------
  var tr = document.querySelector(".trailer");
  if (tr) {
    var tv = tr.querySelector("video"), tb = tr.querySelector(".trailer-play");
    tb.addEventListener("click", function () {
      tv.src = tv.dataset.src; tv.controls = true; tr.classList.add("playing");
      var p = tv.play(); if (p && p.catch) p.catch(function () {});
      tv.focus();
      track("guardiao_trailer_played");
    });
  }

  // ---------- sugestão de idioma (sem redirecionar ninguém) ----------
  var sug = document.querySelector(".suggest");
  if (sug && I.dirs && !store.lget("g_lang") && !store.lget("g_sug")) {
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    nav = nav.toLowerCase();
    var want = /^pt/.test(nav) ? "pt" : /^es/.test(nav) ? "es" : /^ja/.test(nav) ? "ja"
      : /^zh-(tw|hk|mo|hant)/.test(nav) ? "zht" : /^zh/.test(nav) ? "zh" : /^en/.test(nav) ? "en" : null;
    if (want && want !== doc.dataset.lang && I.suggest && I.suggest[want]) {
      var link = sug.querySelector(".suggest-link");
      link.textContent = I.suggest[want];
      link.href = I.dirs[want];
      link.lang = want === "zht" ? "zh-Hant" : want === "zh" ? "zh-Hans" : want;
      link.dataset.lang = want;
      sug.hidden = false;
      sug.querySelector(".suggest-close").addEventListener("click", function () { sug.hidden = true; store.lset("g_sug", "1"); });
    }
  }
})();
