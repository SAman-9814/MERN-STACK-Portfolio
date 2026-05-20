import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const FAQ = [
    { q: "Who are you?", a: "I'm Aman Sah — a Junior Software Engineer specializing in Full Stack Development & AI Engineering based in Kathmandu, Nepal 🇳🇵" },
    { q: "Tech stack?", a: "I work with MERN & PERN stacks: React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, TypeScript, Tailwind CSS and more!" },
    { q: "AI & n8n skills?", a: "I build AI-powered tools using OpenAI API, LLM integrations, and workflow automation with n8n. Also experienced with Factory AI and AI agent development." },
    { q: "Where do you work?", a: "I currently work at SolutionPath Technology Pvt. Ltd. as a Full Stack Developer, where I've built an Employee Management System and an AI Multi-Vendor E-Commerce App." },
    { q: "Contact info?", a: "Reach me at sah99017@gmail.com, WhatsApp +977-9814834383, or use the contact form on this page!" },
    { q: "View resume?", a: "You can download my resume directly from the hero section of this page 📄" },
];

function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-4 py-3 bg-white/10 rounded-2xl rounded-bl-sm w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b820e6] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#da7d20] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
    );
}

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: "Hi! I'm ARIA 🤖 — Aman's Real-time Intelligent Assistant. Ask me anything about Aman's work, skills, or projects!" }
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const [unread, setUnread] = useState(0);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing, open]);

    useEffect(() => {
        if (!open && messages.length > 1) setUnread(1);
        if (open) setUnread(0);
    }, [open, messages]);

    const sendBotReply = (reply) => {
        setTyping(true);
        setTimeout(() => {
            setTyping(false);
            setMessages(prev => [...prev, { from: 'bot', text: reply }]);
        }, 900 + Math.random() * 400);
    };

    const handleFAQ = (faq) => {
        setMessages(prev => [...prev, { from: 'user', text: faq.q }]);
        sendBotReply(faq.a);
    };

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;
        setInput('');
        setMessages(prev => [...prev, { from: 'user', text }]);

        const lower = text.toLowerCase();
        let reply = "I'm not sure about that, but feel free to email Aman at sah99017@gmail.com 😊";

        if (lower.includes('who') || lower.includes('name') || lower.includes('about')) reply = FAQ[0].a;
        else if (lower.includes('stack') || lower.includes('tech') || lower.includes('skill')) reply = FAQ[1].a;
        else if (lower.includes('ai') || lower.includes('automation') || lower.includes('n8n') || lower.includes('openai')) reply = FAQ[2].a;
        else if (lower.includes('work') || lower.includes('job') || lower.includes('experience') || lower.includes('company')) reply = FAQ[3].a;
        else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('whatsapp')) reply = FAQ[4].a;
        else if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) reply = FAQ[5].a;
        else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) reply = "Hey! 👋 Great to meet you! How can I help you learn more about Aman?";

        sendBotReply(reply);
    };

    return (
        <>
            {/* Chat panel with Framer Motion AnimatePresence */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 60 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 60 }}
                        transition={{ type: 'spring', damping: 22, stiffness: 200 }}
                        className="fixed bottom-24 right-6 z-[9999] w-80 sm:w-96 rounded-3xl overflow-hidden shadow-2xl"
                        style={{
                            background: 'linear-gradient(145deg, #130020, #0a0015)',
                            border: '1px solid rgba(184,32,230,0.35)',
                            boxShadow: '0 0 40px rgba(184,32,230,0.2), 0 25px 50px rgba(0,0,0,0.5)'
                        }}
                    >
                        {/* Animated gradient orb background */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 animate-pulse"
                                style={{ background: 'radial-gradient(circle, #b820e6, transparent)' }} />
                            <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full opacity-15 animate-pulse"
                                style={{ background: 'radial-gradient(circle, #da7d20, transparent)', animationDelay: '1s' }} />
                        </div>

                        {/* Header */}
                        <div className="relative flex items-center justify-between px-5 py-4 header-sweep">
                            <div className="flex items-center gap-3">
                                {/* Animated avatar */}
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full animate-ping opacity-30"
                                        style={{ background: 'linear-gradient(135deg, #b820e6, #da7d20)' }} />
                                    <img src="./assets/aman-ai-avatar.png" alt="Aman" className="relative w-10 h-10 rounded-full object-cover animate-float" style={{ border: '2px solid rgba(255,255,255,0.4)' }} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm font-Ovo tracking-widest uppercase">ARIA</p>
                                    <p className="text-white/60 text-[10px] font-Ovo">Aman's Real-time Intelligent Assistant</p>
                                    <p className="text-white/70 text-xs font-Ovo flex items-center gap-1.5 mt-0.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        Always online
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setOpen(false)}
                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
                                ✕
                            </button>
                        </div>

                        {/* Messages Container */}
                        <div className="h-64 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, ease: 'easeOut' }}
                                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.from === 'bot' && (
                                        <img src="./assets/aman-ai-avatar.png" alt="Aman" className="w-6 h-6 rounded-full object-cover mr-2 mt-1 flex-shrink-0" style={{ border: '1px solid rgba(184,32,230,0.5)' }} />
                                    )}
                                    <div
                                        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs font-Ovo leading-relaxed
                                            ${msg.from === 'user'
                                                ? 'text-white rounded-br-none'
                                                : 'text-white/90 rounded-bl-none'}`}
                                        style={msg.from === 'user'
                                            ? { background: 'linear-gradient(135deg, #b820e6, #da7d20)', boxShadow: '0 4px 12px rgba(184,32,230,0.3)' }
                                            : { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }
                                        }
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {typing && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 mt-1 flex-shrink-0"
                                        style={{ background: 'linear-gradient(135deg, #b820e6, #da7d20)' }}>
                                        🤖
                                    </div>
                                    <TypingDots />
                                </motion.div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Divider */}
                        <div className="mx-4 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(184,32,230,0.4), transparent)' }} />

                        {/* FAQ chips */}
                        <div className="px-4 pt-3 pb-2 flex flex-wrap gap-1.5">
                            {FAQ.slice(0, 3).map((faq, i) => (
                                <button key={i} onClick={() => handleFAQ(faq)}
                                    className="text-[10px] font-Ovo px-3 py-1 rounded-full text-white/80 transition-all duration-200 hover:scale-105 hover:text-white"
                                    style={{ border: '1px solid rgba(184,32,230,0.4)', background: 'rgba(184,32,230,0.1)' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(184,32,230,0.25)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(184,32,230,0.1)'}
                                >
                                    {faq.q}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="flex items-center gap-2 px-4 pb-4 pt-2">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                className="flex-1 text-white text-xs font-Ovo placeholder-white/30 px-4 py-2.5 rounded-full outline-none transition-all duration-300"
                                style={{
                                    background: 'rgba(255,255,255,0.07)',
                                    border: '1px solid rgba(184,32,230,0.3)',
                                }}
                                onFocus={e => e.target.style.borderColor = '#b820e6'}
                                onBlur={e => e.target.style.borderColor = 'rgba(184,32,230,0.3)'}
                            />
                            <button onClick={handleSend}
                                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110 active:scale-95"
                                style={{ background: 'linear-gradient(135deg, #b820e6, #da7d20)', boxShadow: '0 4px 12px rgba(184,32,230,0.4)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hello speech bubble with spring entry */}
            <AnimatePresence>
                {!open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 15 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 220, delay: 0.6 }}
                        className="fixed bottom-24 right-6 z-[9998]"
                    >
                        <div className="relative px-4 py-2.5 rounded-2xl rounded-br-none text-xs font-Ovo font-semibold text-white shadow-xl"
                            style={{ background: 'linear-gradient(135deg, #b820e6, #da7d20)', boxShadow: '0 4px 20px rgba(184,32,230,0.4)' }}>
                            <span className="animate-wave inline-block mr-1">👋</span> Hi! I'm <strong>ARIA</strong> — Ask me anything!
                            {/* Tail */}
                            <div className="absolute -bottom-2 right-3 w-0 h-0"
                                style={{ borderLeft: '8px solid transparent', borderRight: '0px', borderTop: '8px solid #da7d20' }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle button with ripple rings and magnetic attraction */}
            <div className="fixed bottom-6 right-6 z-[9999]">
                <Magnetic range={0.25}>
                    <div className="relative cursor-pointer">
                        {/* Orbiting dots */}
                        {!open && (
                            <>
                                <span className="orbit-dot" />
                                <span className="orbit-dot orbit-dot-2" />
                            </>
                        )}
                        {/* Ripple rings */}
                        {!open && (
                            <>
                                <div className="absolute inset-0 rounded-full animate-ping opacity-25"
                                    style={{ background: 'linear-gradient(135deg, #b820e6, #da7d20)' }} />
                                <div className="absolute -inset-2 rounded-full animate-ping opacity-15"
                                    style={{ background: 'linear-gradient(135deg, #b820e6, #da7d20)', animationDelay: '0.5s' }} />
                            </>
                        )}

                        {/* Unread badge */}
                        {unread > 0 && !open && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold z-10 animate-bounce">
                                {unread}
                            </div>
                        )}

                        <button
                            onClick={() => setOpen(o => !o)}
                            className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 btn-gradient-anim glow-cycle"
                            title="Chat with Aman's Assistant"
                        >
                            {/* Sparkle particles */}
                            {!open && (
                                <>
                                    <span className="sparkle" style={{ top: '5%', left: '20%', animationDelay: '0s', width: 5, height: 5, background: '#fff' }} />
                                    <span className="sparkle" style={{ top: '70%', left: '80%', animationDelay: '0.5s', width: 4, height: 4, background: '#da7d20' }} />
                                    <span className="sparkle" style={{ top: '80%', left: '15%', animationDelay: '1s', width: 5, height: 5, background: '#b820e6' }} />
                                </>
                            )}
                            {open
                                ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                : <img src="./assets/aman-ai-avatar.png" alt="Aman" className="w-10 h-10 rounded-full object-cover object-top" />
                            }
                        </button>
                    </div>
                </Magnetic>
            </div>
        </>
    );
}
