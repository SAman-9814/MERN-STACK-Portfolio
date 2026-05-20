import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import WordReveal from './WordReveal';
import Magnetic from './Magnetic';

export default function Header() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, rotateX: 15 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ perspective: 1200 }}
            className="relative w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 pt-20"
        >
            {/* Floating 3D/Glassmorphic Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 360],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/4 left-0 sm:-left-12 w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#b820e6]/15 to-[#da7d20]/5 blur-sm border border-purple-500/10 backdrop-blur-md"
                />
                <motion.div
                    animate={{
                        y: [0, 25, 0],
                        rotate: [360, 0],
                        scale: [1, 0.95, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className="absolute bottom-1/4 right-0 sm:-right-12 w-32 h-32 rounded-full bg-gradient-to-br from-[#da7d20]/15 to-[#7c3aed]/5 blur-sm border border-orange-500/10 backdrop-blur-md"
                />
                <motion.div
                    animate={{
                        x: [0, 15, -15, 0],
                        y: [0, -15, 15, 0],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/3 right-1/4 w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-md"
                />
            </div>

            {/* Avatar image wrapped in 3D TiltCard */}
            <motion.div variants={itemVariants} className="w-32 h-32 mb-2 group relative">
                <TiltCard className="rounded-full" glowColor="rgba(184, 32, 230, 0.4)">
                    <img src="./assets/a.jpg" alt="Aman Sah" className="rounded-full w-32 aspect-square object-cover ring-4 ring-[#b820e6]/30 shadow-xl" />
                </TiltCard>
                
                {/* Green Online status dot */}
                <span className="absolute bottom-1.5 right-1.5 flex h-3.5 w-3.5 z-20">
                    {/* Pulse ring */}
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    {/* Inner dot */}
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-white dark:border-darkTheme" />
                </span>
            </motion.div>

            <motion.h3 variants={itemVariants} className="flex items-end gap-2 text-xl md:text-2xl mb-1 font-Ovo">
                Hi! I&apos;m Aman Sah
                <img src="./assets/hand-icon.png" alt="" className="w-6 mb-1 animate-wave" />
            </motion.h3>

            <motion.h1 variants={itemVariants} className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo leading-tight flex flex-col items-center">
                <WordReveal text="Full Stack & AI Engineer" className="justify-center font-Ovo text-center" />
                <span className="text-2xl sm:text-4xl lg:text-[40px] bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent font-semibold mt-1">
                    <WordReveal text="based in Kathmandu, Nepal." className="justify-center" />
                </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="max-w-2xl mx-auto font-Ovo text-gray-600 dark:text-white/75 leading-relaxed">
                Junior Software Engineer specializing in MERN &amp; PERN stack development and AI engineering — building end-to-end web apps, AI-powered tools, and workflow automation with n8n.
            </motion.p>

            {/* Role badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mt-1">
                {["Full Stack Developer", "AI Engineer", "React.js", "Node.js", "OpenAI & n8n"].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full border border-gray-300 dark:border-white/20 bg-white dark:bg-white/5 text-gray-700 dark:text-white/70 font-Ovo hover:scale-105 hover:border-[#b820e6]/50 dark:hover:border-[#b820e6]/50 transition-all duration-300 cursor-default">
                        {tag}
                    </span>
                ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                <Magnetic range={0.2}>
                    <a href="#contact"
                        className="px-10 py-2.5 border rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white flex items-center gap-2 dark:border-transparent hover:opacity-90 hover:scale-105 shadow-[0_4px_15px_rgba(184,32,230,0.2)] hover:shadow-[0_4px_25px_rgba(184,32,230,0.4)] transition-all duration-300">
                        Contact me <img src="./assets/right-arrow-white.png" alt="" className="w-4" />
                    </a>
                </Magnetic>

                <Magnetic range={0.2}>
                    <a href="./assets/Aman_Sah_Resume.pdf" download="Aman_Sah_Resume.pdf"
                        className="px-10 py-2.5 rounded-full border border-gray-300 dark:border-white/25 hover:bg-slate-100/70 dark:hover:bg-darkHover flex items-center gap-2 bg-white dark:bg-transparent dark:text-white hover:scale-105 transition-all duration-300">
                        My Resume <img src="./assets/download-icon.png" alt="" className="w-4 dark:invert" />
                    </a>
                </Magnetic>
            </motion.div>

        </motion.div>
    )
}