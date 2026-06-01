import { useState } from 'react';
import TiltCard from './TiltCard';
import ScrollReveal3D from './ScrollReveal3D';
import WordReveal from './WordReveal';
import { motion, AnimatePresence } from 'framer-motion';

export default function Experience() {
    const [openProject, setOpenProject] = useState(null);

    const experience = [
        {
            role: "Full Stack Developer",
            company: "SolutionPath Technology Pvt. Ltd.",
            duration: "Jan 2025 – Present",
            projects: [
                {
                    name: "Employee Management System",
                    techStack: ["React.js", "MongoDB", "Express.js", "Node.js"],
                    highlights: [
                        "Built a role-based employee management platform, reducing HR manual workload by ~40% through automated attendance tracking and payroll calculation.",
                        "Developed 15+ RESTful API endpoints handling employee records, leave requests, and payroll data.",
                        "Implemented JWT-based authentication with RBAC for 3 user roles: Admin, Manager, and Employee.",
                        "Built 10+ reusable React.js components with Tailwind CSS, cutting frontend development time by ~30%."
                    ]
                },
                {
                    name: "AI Multi-Vendor E-Commerce App",
                    techStack: ["Next.js", "PostgreSQL", "Node.js", "Prisma ORM"],
                    highlights: [
                        "Architected a multi-vendor e-commerce platform supporting independent vendor dashboards and order management pipelines.",
                        "Integrated AI-powered product recommendations using LLM APIs, increasing simulated engagement by ~35%.",
                        "Leveraged Next.js SSR & SSG to improve page load speed by ~50% and optimized SEO across 100+ pages.",
                        "Built a real-time vendor analytics dashboard tracking sales, inventory, and order status."
                    ]
                }
            ]
        }
    ];

    const education = [
        {
            degree: "B.Tech — Computer Science Engineering",
            institution: "Jain University",
            location: "Bangalore, India",
            duration: "Graduated: Nov 2025",
            cgpa: "8.0 / 10.0"
        }
    ];

    return (
        <div id="experience" className="w-full px-[12%] py-10 scroll-mt-20 overflow-hidden">
            <ScrollReveal3D>
                <div className="flex justify-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-300 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10">
                        <span className="w-2 h-2 rounded-full bg-[#b820e6] animate-pulse" />
                        <span className="text-xs font-semibold text-[#b820e6] font-Ovo tracking-widest uppercase">Background</span>
                    </div>
                </div>
                <h2 className="text-center text-5xl font-Ovo font-bold mb-4 shimmer-text flex justify-center">
                    <WordReveal text="Experience & Education" className="justify-center" />
                </h2>
                <div className="flex items-center justify-center gap-2 mb-5">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#b820e6]" />
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] animate-bounce" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#da7d20]" />
                </div>
                <p className="text-center max-w-2xl mx-auto mt-5 mb-14 font-Ovo">
                    My professional journey and academic background.
                </p>
            </ScrollReveal3D>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

                {/* ---- Work Experience Column ---- */}
                <ScrollReveal3D delay={0.1}>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-white font-Ovo mb-5 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b820e6] to-[#da7d20] flex items-center justify-center text-sm text-white">💼</span>
                            Work Experience
                        </h3>

                        <div className="flex flex-col gap-5">
                            {experience.map((exp, idx) => (
                                <TiltCard
                                    key={idx}
                                    glowColor="rgba(184, 32, 230, 0.2)"
                                    className="border border-gray-300 dark:border-white/20 rounded-2xl bg-white dark:bg-white/5 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5 pb-4 border-b border-gray-100 dark:border-white/10">
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800 dark:text-white font-Ovo">{exp.role}</h4>
                                                <p className="text-[#b820e6] text-sm font-medium mt-0.5 font-Ovo">{exp.company}</p>
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-white/50 font-Ovo border border-gray-200 dark:border-white/20 px-3 py-1 rounded-full whitespace-nowrap self-start">
                                                {exp.duration}
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            {exp.projects.map((project, pi) => (
                                                <div key={pi} className="rounded-xl border border-gray-100 dark:border-white/10 overflow-hidden bg-gray-50/50 dark:bg-white/[0.02]">
                                                    <button
                                                        onClick={() => setOpenProject(openProject === `${idx}-${pi}` ? null : `${idx}-${pi}`)}
                                                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition"
                                                    >
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-700 dark:text-white font-Ovo">{project.name}</p>
                                                            <div className="flex flex-wrap gap-1 mt-1.5">
                                                                 {project.techStack.map((tech, ti) => (
                                                                     <span key={ti} className="px-2 py-0.5 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/5 text-gray-600 dark:text-white/70 rounded text-[10px] font-Ovo">
                                                                         {tech}
                                                                     </span>
                                                                 ))}
                                                            </div>
                                                        </div>
                                                        <span className={`text-[#b820e6] text-lg transition-transform duration-300 ml-3 flex-shrink-0 ${openProject === `${idx}-${pi}` ? 'rotate-180' : ''}`}>
                                                            ⌄
                                                        </span>
                                                    </button>

                                                    <AnimatePresence initial={false}>
                                                         {openProject === `${idx}-${pi}` && (
                                                             <motion.div
                                                                 initial={{ height: 0, opacity: 0 }}
                                                                 animate={{ height: 'auto', opacity: 1 }}
                                                                 exit={{ height: 0, opacity: 0 }}
                                                                 transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                                                 className="overflow-hidden"
                                                             >
                                                                 <div className="px-4 pb-4 border-t border-gray-100 dark:border-white/10 pt-3 bg-white dark:bg-darkHover/20">
                                                                     <ul className="space-y-2">
                                                                         {project.highlights.map((point, hi) => (
                                                                             <li key={hi} className="flex gap-2 text-xs text-gray-600 dark:text-white/70 leading-relaxed font-Ovo">
                                                                                 <span className="text-[#b820e6] flex-shrink-0 mt-0.5">✦</span>
                                                                                 <span>{point}</span>
                                                                             </li>
                                                                         ))}
                                                                     </ul>
                                                                 </div>
                                                             </motion.div>
                                                         )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </ScrollReveal3D>

                {/* ---- Education & Stats Column ---- */}
                <ScrollReveal3D delay={0.25}>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-white font-Ovo mb-5 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b820e6] to-[#da7d20] flex items-center justify-center text-sm text-white">🎓</span>
                            Education
                        </h3>

                        <div className="flex flex-col gap-5">
                            {education.map((edu, idx) => (
                                <TiltCard
                                    key={idx}
                                    glowColor="rgba(218, 125, 32, 0.2)"
                                    className="border border-gray-300 dark:border-white/20 rounded-2xl bg-white dark:bg-white/5 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800 dark:text-white font-Ovo">{edu.degree}</h4>
                                                <p className="text-[#b820e6] text-sm font-medium mt-1 font-Ovo">{edu.institution}</p>
                                                <p className="text-sm text-gray-500 dark:text-white/50 mt-0.5 font-Ovo">{edu.location}</p>
                                                <span className="inline-block mt-3 text-sm font-medium text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full font-Ovo">
                                                    CGPA: {edu.cgpa}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-white/50 font-Ovo border border-gray-200 dark:border-white/20 px-3 py-1 rounded-full whitespace-nowrap self-start">
                                                {edu.duration}
                                            </span>
                                        </div>
                                    </div>
                                </TiltCard>
                            ))}

                            {/* Stat Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Experience", value: "1+ Year", icon: "⚡", glowColor: "rgba(184, 32, 230, 0.2)" },
                                    { label: "Live Projects", value: "25+", icon: "🚀", glowColor: "rgba(218, 125, 32, 0.2)" },
                                ].map((stat, i) => (
                                    <TiltCard
                                        key={i}
                                        glowColor={stat.glowColor}
                                        className="border border-gray-200 dark:border-white/15 rounded-2xl bg-white dark:bg-white/5 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="p-5 text-center flex flex-col items-center justify-center">
                                            <div className="text-2xl mb-1">{stat.icon}</div>
                                            <div className="text-xl font-bold text-gray-800 dark:text-white font-Ovo">{stat.value}</div>
                                            <div className="text-xs text-gray-500 dark:text-white/50 font-Ovo mt-0.5">{stat.label}</div>
                                        </div>
                                    </TiltCard>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal3D>

            </div>
        </div>
    );
}
