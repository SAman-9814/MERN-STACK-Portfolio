import { useState, useEffect } from 'react';
import axios from 'axios';
import TiltCard from './TiltCard';
import ScrollReveal3D from './ScrollReveal3D';
import Magnetic from './Magnetic';
import WordReveal from './WordReveal';

const fallbackProjects = [
    {
        title: "Full Stack AI Fitness App",
        techStack: ["React.js", "Strapi", "OpenAI", "Node.js"],
        github: "https://github.com/SAman-9814/LeetCode-Profile",
        live: "https://leet-code-profile-phi.vercel.app",
        description: "An AI-powered fitness platform generating personalized workout and nutrition plans using OpenAI and Strapi CMS.",
        image: "./assets/work-1.png"
    },
    {
        title: "Doctor Appointment AI Agent",
        techStack: ["n8n", "WhatsApp API", "OpenAI"],
        github: "https://github.com/SAman-9814/React-Paste-App",
        live: "https://react-paste-app-dusky.vercel.app",
        description: "A conversational AI agent on WhatsApp automating the full doctor appointment booking lifecycle via n8n.",
        image: "./assets/work-2.png"
    },
    {
        title: "E-Commerce Dashboard",
        techStack: ["Next.js", "Tailwind", "Firebase"],
        github: "https://github.com/SAman-9814",
        live: "#",
        description: "A responsive admin dashboard for managing products and orders with real-time analytics.",
        image: "./assets/work-3.png"
    },
    {
        title: "Real-time Task Manager",
        techStack: ["MERN", "Socket.io", "Redux"],
        github: "https://github.com/SAman-9814",
        live: "#",
        description: "A collaborative task application featuring real-time syncing and intuitive drag-and-drop Kanban boards.",
        image: "./assets/work-4.png"
    }
];

const getOptimizedImageUrl = (url) => {
    if (!url) return '';
    if (url.includes('res.cloudinary.com')) {
        return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return url;
};

export default function Work() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/projects');
                if (response.data && response.data.length > 0) {
                    // Pinned projects float to the top (mirrors DB sort)
                    const sorted = [...response.data].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
                    setProjects(sorted);
                } else {
                    setProjects(fallbackProjects);
                }
            } catch (error) {
                console.error('Error fetching projects from DB, using fallback projects:', error);
                setProjects(fallbackProjects);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const SkeletonCard = () => (
        <div className="flex flex-col bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl h-[380px] overflow-hidden animate-pulse">
            <div className="w-full h-36 bg-gray-200 dark:bg-white/10" />
            <div className="p-5 flex flex-col flex-grow gap-3">
                <div className="h-5 bg-gray-200 dark:bg-white/10 rounded-md w-3/4 animate-pulse" />
                <div className="flex gap-2.5">
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-md w-16 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-md w-16 animate-pulse" />
                </div>
                <div className="h-12 bg-gray-200 dark:bg-white/10 rounded-md w-full mt-2 animate-pulse" />
                <div className="h-8 bg-gray-200 dark:bg-white/10 rounded-full w-full mt-auto animate-pulse" />
            </div>
        </div>
    );

    return (
        <div id="work" className="w-full px-[12%] py-10 scroll-mt-20 overflow-hidden">
            <ScrollReveal3D>
                <div className="flex justify-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-300 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10">
                        <span className="w-2 h-2 rounded-full bg-[#b820e6] animate-pulse" />
                        <span className="text-xs font-semibold text-[#b820e6] font-Ovo tracking-widest uppercase">My Portfolio</span>
                    </div>
                </div>
                <h2 className="text-center text-5xl font-Ovo font-bold mb-4 shimmer-text flex justify-center">
                    <WordReveal text="My Latest Work" className="justify-center" />
                </h2>
                <div className="flex items-center justify-center gap-2 mb-5">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#b820e6]" />
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] animate-bounce" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#da7d20]" />
                </div>
                <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">Welcome to my web development portfolio! Here is a detailed look at my most recent and impactful projects.</p>
            </ScrollReveal3D>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
                {loading ? (
                    Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                    projects.map((project, idx) => (
                        <div key={idx} className="h-full">
                            <ScrollReveal3D delay={0.1 * idx} className="h-full">
                                <TiltCard
                                    glowColor="rgba(184, 32, 230, 0.2)"
                                    className="flex flex-col bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-2xl font-Ovo h-full overflow-hidden"
                                >
                                    <div className="relative w-full h-36 border-b border-gray-200 dark:border-white/10 overflow-hidden group">
                                        <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${getOptimizedImageUrl(project.image)})` }}></div>
                                    </div>
                                    
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">{project.title}</h3>

                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {project.techStack.map((tech, index) => (
                                                <span key={index} className="px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white rounded text-[10px] font-medium whitespace-nowrap">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <p className="text-xs text-gray-600 dark:text-white/70 leading-relaxed line-clamp-3 mb-4 flex-grow">
                                            {project.description}
                                        </p>

                                        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
                                            <Magnetic range={0.2} className="flex-1">
                                                <a href={project.github} target="_blank" rel="noreferrer" className="w-full block text-center text-xs px-2 py-1.5 border border-gray-300 dark:border-white/30 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition dark:text-white">
                                                    GitHub
                                                </a>
                                            </Magnetic>
                                            <Magnetic range={0.2} className="flex-1">
                                                <a href={project.live} target="_blank" rel="noreferrer" className="w-full block text-center text-xs px-2 py-1.5 bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white rounded-full hover:opacity-90 transition shadow-sm">
                                                    Live Demo
                                                </a>
                                            </Magnetic>
                                        </div>
                                    </div>
                                </TiltCard>
                            </ScrollReveal3D>
                        </div>
                    ))
                )}
            </div>

            <ScrollReveal3D delay={0.4}>
                <div className="flex justify-center my-20">
                    <Magnetic range={0.2}>
                        <a href="https://github.com/SAman-9814" target="_blank" rel="noreferrer" className="w-max flex items-center justify-center gap-2 text-gray-700 border border-gray-300 dark:border-white/25 hover:bg-slate-100/70 dark:hover:bg-darkHover rounded-full py-3 px-10 duration-300 dark:text-white hover:scale-105 transition-transform font-Ovo">
                            View all my projects on GitHub
                            <img src="./assets/right-arrow-bold.png" alt="" className="w-4 dark:hidden" />
                            <img src="./assets/right-arrow-bold-dark.png" alt="" className="w-4 hidden dark:block" />
                        </a>
                    </Magnetic>
                </div>
            </ScrollReveal3D>
        </div>
    )
}