import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Projects from './components/Projects'
import FeaturedScroll from './components/FeaturedScroll'
import Skills from './components/Skills'
import Experience from './components/Experience'
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
        <Stats />
        <Projects />
        <FeaturedScroll />
        <Skills />
        <Experience />
        <Explore />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
