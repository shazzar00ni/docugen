import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Features } from './components/Features'
import { Preview } from './components/Preview'
import { Pricing } from './components/Pricing'
import { Newsletter } from './components/Newsletter'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Preview />
        <Pricing />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default App
