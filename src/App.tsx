import { Header } from "./components/header"
import { Hero } from "./components/hero"
import { About } from "./components/about"
import { Technologies } from "./components/technologies"
import { Projects } from "./components/projects"
import { Experience } from "./components/experience"
import { Contact } from "./components/contact"
import { Footer } from "./components/footer"

function App() {
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
