import { useEffect } from "react"
import { Header } from "./components/header"
import { Hero } from "./components/hero"
import { About } from "./components/about"
import { Technologies } from "./components/technologies"
import { Projects } from "./components/projects"
import { Experience } from "./components/experience"
import { Contact } from "./components/contact"
import { Footer } from "./components/footer"
import { initAnalytics } from "./lib/analytics"
import { useSectionDwell } from "./hooks/use-section-dwell"
import { useScrollDepth } from "./hooks/use-scroll-depth"

const SECTION_IDS = [
  "home",
  "about",
  "technologies",
  "projects",
  "experience",
  "contact",
] as const

function App() {
  useEffect(() => {
    initAnalytics()
  }, [])
  useSectionDwell(SECTION_IDS)
  useScrollDepth()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
