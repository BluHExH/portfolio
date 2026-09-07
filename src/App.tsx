import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Now from './components/Now'
import Stats from './components/Stats'
import Featured from './components/Featured'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Notes from './components/Notes'
import Explore from './components/Explore'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Now />
        <Stats />
        <Featured />
        <Projects />
        <Skills />
        <Experience />
        <Notes />
        <Explore />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
