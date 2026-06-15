import TiltCard from './TiltCard';
import ScrollReveal3D from './ScrollReveal3D';
import WordReveal from './WordReveal';
import Magnetic from './Magnetic';
import { motion } from 'framer-motion';

export default function About() {
    const data = [
        {
            name: 'Experience',
            emoji: '⚡',
            from: '#7c3aed',
            to: '#b820e6',
            glowColor: 'rgba(184,32,230,0.25)',
            description: '1+ Year at SolutionPath Technology',
        },
        {
            name: 'Worked Clients',
            emoji: '🤝',
            from: '#0ea5e9',
            to: '#6366f1',
            glowColor: 'rgba(99,102,241,0.25)',
            description: '5+ happy clients on real-world projects',
        },
        {
            name: 'Delivered Projects',
            emoji: '🚀',
            from: '#da7d20',
            to: '#f43f5e',
            glowColor: 'rgba(218,125,32,0.25)',
            description: '5+ Full Stack & AI Projects delivered',
        },
    ];

    return (
        <div id="about" className="w-full px-[12%] py-10 scroll-mt-20 overflow-hidden">
            <ScrollReveal3D>
                <div className="flex justify-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-300 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10">
                        <span className="w-2 h-2 rounded-full bg-[#b820e6] animate-pulse" />
                        <span className="text-xs font-semibold text-[#b820e6] font-Ovo tracking-widest uppercase">Introduction</span>
                    </div>
                </div>
                <h2 className="text-center text-5xl font-Ovo font-bold mb-4 shimmer-text flex justify-center">
                    <WordReveal text="About me" className="justify-center" />
                </h2>
                <div className="flex items-center justify-center gap-2 mb-5">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#b820e6]" />
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] animate-bounce" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#da7d20]" />
                </div>
            </ScrollReveal3D>

            <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
                {/* Image section with Scroll Reveal and Tilt */}
                <ScrollReveal3D className="max-w-max mx-auto relative group" duration={1}>
                    <div className="animate-float relative">
                        {/* Decorative glow orbs */}
                        <div className="absolute -top-4 -left-4 w-5 h-5 rounded-full bg-[#b820e6] opacity-70 animate-ping" />
                        <div className="absolute -bottom-3 -right-3 w-4 h-4 rounded-full bg-[#da7d20] opacity-60 animate-bounce" />
                        <div className="absolute top-1/2 -left-5 w-3 h-3 rounded-full bg-[#7c3aed] opacity-50 animate-pulse" />

                        {/* Gradient animated border wrapper */}
                        <TiltCard className="rounded-[1.5rem]" glowColor="rgba(184, 32, 230, 0.3)">
                            <div className="gradient-img-border shadow-[0_8px_40px_rgba(184,32,230,0.3)]">
                                <img src='./assets/about.png' alt="Aman Sah" className="w-64 sm:w-80 h-[320px] sm:h-[400px] max-w-none object-cover" />
                            </div>
                        </TiltCard>
                    </div>

                    <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/3 z-20">
                        <Magnetic range={0.3} className="block">
                            <div className="bg-white dark:bg-darkHover w-36 h-36 sm:w-44 sm:h-44 rounded-full shadow-[0_4px_55px_rgba(149,0,162,0.15)] flex items-center justify-center relative cursor-pointer">
                                <svg viewBox="0 0 200 200" className="w-full h-full animate-spin_slow">
                                    <defs>
                                        <path id="circle" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                                        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#b820e6" />
                                            <stop offset="100%" stopColor="#da7d20" />
                                        </linearGradient>
                                    </defs>
                                    <text fontSize="11.5" fontFamily="sans-serif" fontWeight="600" fill="url(#textGrad)" letterSpacing="2">
                                        <textPath href="#circle">
                                            Junior Software Engineer • Full Stack Developer • AI Engineer •
                                        </textPath>
                                    </text>
                                </svg>
                                <img src="./assets/boy-macbook.png" alt="Developer" className="w-1/3 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            </div>
                        </Magnetic>
                    </div>
                </ScrollReveal3D>

                <div className="flex-1">
                    <ScrollReveal3D delay={0.2}>
                        <p className="text-justify mb-10 max-w-2xl font-Ovo leading-relaxed">
                            Motivated Junior Software Engineer specializing in <span className="text-[#b820e6] font-semibold">Full Stack Development</span> and <span className="text-[#b820e6] font-semibold">AI Engineering</span> with hands-on experience building MERN and PERN stack applications, AI-powered tools, and workflow automation using n8n. Skilled in React.js, Next.js, Node.js, and LLM integrations, with a proven track record of delivering end-to-end web and AI solutions.
                        </p>
                    </ScrollReveal3D>

                    {/* Stats cards list with TiltCard */}
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl">
                        {data.map((item, idx) => (
                            <li key={item.name} className="h-full">
                                <ScrollReveal3D delay={0.1 * idx + 0.3} className="h-full">
                                    <TiltCard
                                        glowColor={item.glowColor}
                                        className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 cursor-default"
                                    >
                                        <div className="h-1.5 w-full" style={{ background: `linear-gradient(to right, ${item.from}, ${item.to})` }} />
                                        <div className="p-5 flex flex-col gap-2">
                                            <div
                                                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-sm"
                                                style={{ background: `linear-gradient(135deg, ${item.from}, ${item.to})` }}
                                            >
                                                {item.emoji}
                                            </div>
                                            <h3
                                                className="mt-2 font-bold text-sm font-Ovo"
                                                style={{ background: `linear-gradient(to right, ${item.from}, ${item.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                                            >
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-500 dark:text-white/60 text-xs font-Ovo leading-relaxed">{item.description}</p>
                                        </div>
                                    </TiltCard>
                                </ScrollReveal3D>
                            </li>
                        ))}
                    </ul>

                    <ScrollReveal3D delay={0.5}>
                        <h4 className="my-6 text-gray-700 font-Ovo dark:text-white/80">Stack Expertise</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl">
                            {[
                                { label: 'MERN Stack', sub: 'MongoDB · Express · React · Node', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', from: '#7c3aed', to: '#b820e6' },
                                { label: 'PERN Stack', sub: 'PostgreSQL · Express · React · Node', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', from: '#0ea5e9', to: '#6366f1' },
                                { label: 'AI Engineering', sub: 'LLM · OpenAI · n8n · AI Agents', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg', from: '#da7d20', to: '#b820e6' },
                            ].map((stack) => (
                                <motion.div
                                    key={stack.label}
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    className="group relative flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden cursor-default transition-all duration-300"
                                    onMouseEnter={e => e.currentTarget.style.boxShadow = `0 6px 24px ${stack.from}33`}
                                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                                >
                                    {/* Gradient accent bar */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: `linear-gradient(to bottom, ${stack.from}, ${stack.to})` }} />

                                    {/* Icon */}
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ml-1" style={{ background: `linear-gradient(135deg, ${stack.from}22, ${stack.to}22)`, border: `1px solid ${stack.from}44` }}>
                                        <img src={stack.icon} alt={stack.label} className="w-5 h-5 object-contain" />
                                    </div>

                                    {/* Text */}
                                    <div className="min-w-0">
                                        <p className="text-xs font-bold font-Ovo truncate" style={{ background: `linear-gradient(to right, ${stack.from}, ${stack.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                            {stack.label}
                                        </p>
                                        <p className="text-[9px] text-gray-400 dark:text-white/40 font-Ovo truncate">{stack.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </ScrollReveal3D>
                </div>
            </div>
        </div>
    )
}