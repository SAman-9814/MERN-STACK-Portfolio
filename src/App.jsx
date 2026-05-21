import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import Preloader from './components/Preloader'
import { Analytics } from '@vercel/analytics/react'

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <Preloader finishLoading={() => setIsLoading(false)} />}
            </AnimatePresence>

            {!isLoading && (
                <>
                    <CustomCursor />
                    <LenisScroll />
                    <Navbar />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Header />
                        <About />
                        <Skills />
                        <Experience />
                        <Services />
                        <Work />
                        <GithubStats />
                        <Contact />
                        <Footer />
                    </motion.div>
                    <Chatbot />
                    <Analytics />
                </>
            )}
        </>
    )
}