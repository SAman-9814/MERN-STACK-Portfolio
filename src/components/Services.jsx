import TiltCard from './TiltCard';
import ScrollReveal3D from './ScrollReveal3D';
import WordReveal from './WordReveal';
import Magnetic from './Magnetic';

export default function Services() {
    const services = [
        {
            name: 'Full Stack Development',
            emoji: '⚡',
            gradient: 'from-violet-500 via-purple-500 to-[#b820e6]',
            glowColor: 'rgba(184,32,230,0.25)',
            description: 'End-to-end MERN & PERN stack apps — from blazing-fast React/Next.js frontends to scalable Node.js backends with MongoDB & PostgreSQL.',
            tags: ['React.js', 'Next.js', 'Node.js', 'MongoDB'],
            link: '#work',
        },
        {
            name: 'AI & Automation',
            emoji: '🤖',
            gradient: 'from-[#da7d20] via-orange-500 to-rose-500',
            glowColor: 'rgba(218,125,32,0.25)',
            description: 'Intelligent AI agents, LLM integrations with OpenAI, automated workflows via n8n, and WhatsApp Business API bots for real-world automation.',
            tags: ['OpenAI API', 'n8n', 'LLM', 'WhatsApp API'],
            link: '#work',
        },
        {
            name: 'Backend & APIs',
            emoji: '🛠️',
            gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
            glowColor: 'rgba(99,102,241,0.25)',
            description: 'Robust REST & GraphQL APIs with JWT auth, RBAC, Strapi CMS and Prisma ORM — clean architecture built for production scale.',
            tags: ['REST APIs', 'GraphQL', 'Strapi', 'Prisma'],
            link: '#work',
        },
        {
            name: 'Frontend & UI',
            emoji: '🎨',
            gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
            glowColor: 'rgba(20,184,166,0.25)',
            description: 'Pixel-perfect, responsive UIs with Next.js SSR/SSG. SEO-optimized, lightning-fast performance and modern design with Tailwind & TypeScript.',
            tags: ['React.js', 'Tailwind CSS', 'TypeScript', 'SEO'],
            link: '#work',
        },
    ];

    return (
        <div id="services" className="w-full px-[12%] py-10 scroll-mt-20 overflow-hidden">
            <ScrollReveal3D>
                <div className="flex justify-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-300 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10">
                        <span className="w-2 h-2 rounded-full bg-[#b820e6] animate-pulse" />
                        <span className="text-xs font-semibold text-[#b820e6] font-Ovo tracking-widest uppercase">What I offer</span>
                    </div>
                </div>
                <h2 className="text-center text-5xl font-Ovo font-bold mb-4 shimmer-text flex justify-center">
                    <WordReveal text="My Services" className="justify-center" />
                </h2>
                <div className="flex items-center justify-center gap-2 mb-5">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#b820e6]" />
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] animate-bounce" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#da7d20]" />
                </div>
                <p className="text-center max-w-2xl mx-auto mt-5 mb-14 font-Ovo">
                    Junior Software Engineer from Kathmandu, Nepal — specializing in Full Stack & AI Engineering.
                </p>
            </ScrollReveal3D>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
                {services.map((service, idx) => (
                    <div key={service.name} className="h-full">
                        <ScrollReveal3D delay={0.1 * idx} className="h-full">
                            <TiltCard
                                glowColor={service.glowColor}
                                className="group flex flex-col h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 cursor-pointer"
                            >
                                {/* Icon Area */}
                                <div className={`relative w-full h-28 bg-gradient-to-br ${service.gradient} flex items-center justify-center overflow-hidden`}>
                                    {/* Background decoration */}
                                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10 blur-xl"></div>
                                    <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10 blur-lg"></div>

                                    <span className="text-5xl select-none drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {service.emoji}
                                    </span>

                                    {/* Subtle number badge */}
                                    <span className="absolute top-3 right-3 text-xs text-white/50 font-mono font-bold">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-base font-bold text-gray-800 dark:text-white mb-2 font-Ovo">
                                        {service.name}
                                    </h3>

                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {service.tags.map((tag, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70 rounded text-[10px] font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-xs text-gray-500 dark:text-white/60 leading-relaxed flex-grow font-Ovo">
                                        {service.description}
                                    </p>

                                    <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/10">
                                        <Magnetic range={0.2} className="inline-block">
                                            <a
                                                href={service.link}
                                                className={`text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 font-Ovo`}
                                            >
                                                View Projects
                                                <span className="text-sm">→</span>
                                            </a>
                                        </Magnetic>
                                    </div>
                                </div>
                            </TiltCard>
                        </ScrollReveal3D>
                    </div>
                ))}
            </div>
        </div>
    );
}