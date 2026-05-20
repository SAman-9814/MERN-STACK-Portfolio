import Contact from './components/Contact'
import Footer from './components/Footer'
import Work from './components/Work'
import Services from './components/Services'
import About from './components/About'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Skills from './components/Skills'
import Experience from './components/Experience'
import GithubStats from './components/GithubStats'
import LenisScroll from './components/LenisScroll'
import Chatbot from './components/Chatbot'
import CustomCursor from './components/CustomCursor'
import { Analytics } from '@vercel/analytics/react'

export default function App() {
    return (
        <>
            <CustomCursor />
            <LenisScroll />
            <Navbar />
            <Header />
            <About />
            <Skills />
            <Experience />
            <Services />
            <Work />
            <GithubStats />
            <Contact />
            <Footer />
            <Chatbot />
            <Analytics />
        </>
    )
}