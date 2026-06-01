import TiltCard from './TiltCard';
import ScrollReveal3D from './ScrollReveal3D';

const techIcons = {
    "React.js":       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "Next.js":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "JavaScript":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "TypeScript":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "Java":           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    "Python":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "Tailwind CSS":   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    "HTML5":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "CSS3":           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    "Node.js":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "Express.js":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    "GraphQL":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    "Strapi CMS":     "https://cdn.simpleicons.org/strapi/2F2D74",
    "MongoDB":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "PostgreSQL":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "Prisma ORM":     "https://cdn.simpleicons.org/prisma/5A67D8",
    "Mongoose":       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain.svg",
    "OpenAI API":     "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    "n8n":            "https://cdn.simpleicons.org/n8n/ea4b71",
    "WhatsApp API":   "https://cdn.simpleicons.org/whatsapp/25D366",
    "Git":            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    "GitHub":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    "Docker":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "VS Code":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    "Postman":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    "npm":            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
    "REST APIs":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
};

export default function Skills() {
    const skillCategories = [
        {
            title: "Frontend Development",
            subtitle: "Modern UIs & Full Stack Architecture",
            emoji: "⚡",
            from: "#7c3aed",
            to: "#b820e6",
            glowColor: "rgba(184,32,230,0.3)",
            icons: [
                { label: "React.js",     icon: techIcons["React.js"] },
                { label: "Next.js",      icon: techIcons["Next.js"] },
                { label: "JavaScript",   icon: techIcons["JavaScript"] },
                { label: "TypeScript",   icon: techIcons["TypeScript"] },
                { label: "Tailwind CSS", icon: techIcons["Tailwind CSS"] },
                { label: "HTML5",        icon: techIcons["HTML5"] },
                { label: "CSS3",         icon: techIcons["CSS3"] },
                { label: "Java",         icon: techIcons["Java"] },
                { label: "Python",       icon: techIcons["Python"] },
            ],
            tags: ["MERN Stack", "PERN Stack", "Full Stack Development", "Headless CMS"]
        },
        {
            title: "Backend & Databases",
            subtitle: "APIs, Servers & Data Architecture",
            emoji: "🛠️",
            from: "#0ea5e9",
            to: "#6366f1",
            glowColor: "rgba(99,102,241,0.3)",
            icons: [
                { label: "Node.js",     icon: techIcons["Node.js"] },
                { label: "Express.js",  icon: techIcons["Express.js"] },
                { label: "REST APIs",   icon: techIcons["REST APIs"] },
                { label: "GraphQL",     icon: techIcons["GraphQL"] },
                { label: "Strapi CMS",  icon: techIcons["Strapi CMS"] },
                { label: "MongoDB",     icon: techIcons["MongoDB"] },
                { label: "PostgreSQL",  icon: techIcons["PostgreSQL"] },
                { label: "Prisma ORM",  icon: techIcons["Prisma ORM"] },
                { label: "Mongoose",    icon: techIcons["Mongoose"] },
            ],
            tags: ["JWT Auth", "RBAC", "RESTful Services", "API Integration"]
        },
        {
            title: "AI, Tools & DevOps",
            subtitle: "Automation, Agents & Workflow",
            emoji: "🤖",
            from: "#da7d20",
            to: "#f43f5e",
            glowColor: "rgba(218,125,32,0.3)",
            icons: [
                { label: "OpenAI API",   icon: techIcons["OpenAI API"] },
                { label: "n8n",          icon: techIcons["n8n"] },
                { label: "WhatsApp API", icon: techIcons["WhatsApp API"] },
                { label: "Git",          icon: techIcons["Git"] },
                { label: "GitHub",       icon: techIcons["GitHub"] },
                { label: "Docker",       icon: techIcons["Docker"] },
                { label: "VS Code",      icon: techIcons["VS Code"] },
                { label: "Postman",      icon: techIcons["Postman"] },
                { label: "npm",          icon: techIcons["npm"] },
            ],
            tags: ["LLM Integration", "AI Agents", "Factory AI", "CI/CD", "Agile", "Scrum"]
        }
    ];

    return (
        <div id="skills" className="w-full px-[12%] py-10 scroll-mt-20 overflow-hidden">
            <ScrollReveal3D>
                <div className="flex justify-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-300 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10">
                        <span className="w-2 h-2 rounded-full bg-[#b820e6] animate-pulse" />
                        <span className="text-xs font-semibold text-[#b820e6] font-Ovo tracking-widest uppercase">What I know</span>
                    </div>
                </div>
                <h2 className="text-center text-5xl font-Ovo font-bold mb-4 shimmer-text">My Skills</h2>
                <div className="flex items-center justify-center gap-2 mb-5">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#b820e6]" />
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] animate-bounce" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#da7d20]" />
                </div>
                <p className="text-center max-w-2xl mx-auto mt-5 mb-14 font-Ovo">
                    Technologies and tools I use to build powerful, scalable products.
                </p>
            </ScrollReveal3D>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                {skillCategories.map((cat, idx) => (
                    <div key={cat.title} className="h-full">
                        <ScrollReveal3D delay={0.15 * idx} className="h-full">
                            <TiltCard
                                glowColor={cat.glowColor}
                                className="group relative flex flex-col h-full rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 cursor-default"
                            >
                                {/* Gradient top bar */}
                                <div
                                    className="h-1.5 w-full"
                                    style={{ background: `linear-gradient(to right, ${cat.from}, ${cat.to})` }}
                                />

                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-1">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-md"
                                            style={{ background: `linear-gradient(135deg, ${cat.from}, ${cat.to})` }}
                                        >
                                            {cat.emoji}
                                        </div>
                                        <div>
                                            <h3
                                                className="text-base font-bold font-Ovo"
                                                style={{ background: `linear-gradient(to right, ${cat.from}, ${cat.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                                            >
                                                {cat.title}
                                            </h3>
                                            <p className="text-[10px] text-gray-400 dark:text-white/40 font-Ovo">{cat.subtitle}</p>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-gray-100 dark:bg-white/10 my-4" />

                                    {/* Skills icon grid */}
                                    <div className="grid grid-cols-3 gap-2.5">
                                        {cat.icons.map((skill) => (
                                            <div
                                                key={skill.label}
                                                title={skill.label}
                                                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/40 hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 cursor-default"
                                            >
                                                <img
                                                    src={skill.icon}
                                                    alt={skill.label}
                                                    className="w-6 h-6 object-contain transition-transform duration-300"
                                                    style={skill.label === 'OpenAI API' ? { filter: 'invert(47%) sepia(98%) saturate(400%) hue-rotate(115deg) brightness(90%)' } : skill.label === 'GitHub' || skill.label === 'Express.js' ? { filter: 'invert(0.5)' } : {}}
                                                    onError={e => { e.target.style.display = 'none'; }}
                                                />
                                                <span className="text-[9px] text-gray-500 dark:text-white/50 font-Ovo text-center leading-tight line-clamp-1 w-full">
                                                    {skill.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Extra tags */}
                                    <div className="flex flex-wrap gap-1.5 mt-4">
                                        {cat.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-0.5 rounded-full text-[9px] font-medium font-Ovo border hover:scale-105 transition-transform duration-200"
                                                style={{
                                                    borderColor: cat.from + '55',
                                                    color: cat.from,
                                                    background: cat.from + '11'
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Floating watermark emoji */}
                                    <div className="absolute bottom-4 right-4 text-6xl opacity-5 select-none pointer-events-none group-hover:opacity-10 transition-opacity duration-500">
                                        {cat.emoji}
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
