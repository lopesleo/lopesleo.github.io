function calcula(e) {
  e.preventDefault();

  var aux = document.getElementById("salario");
  var valor = Number(aux.value);
  percent = aumento(valor);
  porcentagem = percent * 100;
  acrescimo = valor * percent;
  salario = acrescimo + valor;
  var result = document.getElementById("result");

  result.innerHTML = `
   Salário antes do reajuste: R$ ${valor} <br>
   Percentual de aumento aplicado: R$ ${porcentagem} % <br>
   O valor aumentado foi de:R$ ${acrescimo} <br>
   Novo salário, após o aumento:R$ ${salario} `;
}

function aumento(salario, porcentagem) {
  
    porcentagem = verificaPorcentagem(salario);

    return porcentagem;
  
}

function verificaPorcentagem(salario) {
  if (salario <= 2800) {
    return 0.2;
  } else if (salario > 2800 && salario < 7000) {
    return 0.15;
  } else if (salario >= 7000 && salario < 15000) {
    return 0.1;
  } else {
    return 0.05;
  }
}

function media() {
  let nota = document.getElementById("notas"),
    n1 = nota.value.trim().split("+"),
    aux = 0,
    result2 = document.getElementById("result2")

  if (n1.length == 4) {
    n1.map((value) => (aux += Number(value)));
    aux = aux / 4;
    result2.innerHTML = `Média do aluno: ${aux}`
  }
  else if (n1.length == 5) {
    let pf = n1.pop();
    n1.map((value) => (aux += Number(value)));
    aux = aux / 4;
    aux = (aux + Number(pf)) / 2;
    result2.innerHTML = `Média do aluno: ${aux}`
  }
  else{
    result2.innerHTML = `Coloque 4 ou 5 notas`
  }
}
