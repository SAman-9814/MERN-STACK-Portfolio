import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Contact from './Contact'
import Footer from './Footer'
import Work from './Work'
import Services from './Services'
import About from './About'
import Header from './Header'
import Navbar from './Navbar'
import Skills from './Skills'
import Experience from './Experience'
import GithubStats from './GithubStats'
import LenisScroll from './LenisScroll'
import Chatbot from './Chatbot'
import CustomCursor from './CustomCursor'
import Preloader from './Preloader'
import LoginModal from './LoginModal'
import { Analytics } from '@vercel/analytics/react'

export default function Portfolio() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <Preloader finishLoading={() => setIsLoading(false)} />}
            </AnimatePresence>

            {!isLoading && (
                <>
                    <CustomCursor />
                    <LenisScroll />
                    <Navbar onLoginClick={() => setIsLoginOpen(true)} />
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
                    <AnimatePresence>
                        {isLoginOpen && (
                            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
                        )}
                    </AnimatePresence>
                    <Analytics />
                </>
            )}
        </>
    )
}
