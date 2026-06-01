import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
    "Loading database connection...",
    "Initializing MERN & PERN cores...",
    "Mounting Framer Motion transitions...",
    "Compiling interactive starfields...",
    "Assembling portfolio canvas...",
    "Optimizing responsive viewport...",
    "System Ready!"
];

// High-tech Decryption Text effect for status logs
const DecryptText = ({ text }) => {
    const [displayVal, setDisplayVal] = useState('');
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*{}[];:";

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayVal(
                text
                    .split("")
                    .map((char, index) => {
                        if (char === " ") return " ";
                        if (index < iterations) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );
            
            iterations += 0.5; // Decrypts 1 character every 2 frames
            if (iterations >= text.length + 1) {
                clearInterval(interval);
                setDisplayVal(text);
            }
        }, 20);
        return () => clearInterval(interval);
    }, [text]);

    return <span className="font-mono">{displayVal}</span>;
};

export default function Preloader({ finishLoading }) {
    const [count, setCount] = useState(0);
    const [isExploding, setIsExploding] = useState(false);
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

    const countRef = useRef(0);
    const isExplodingRef = useRef(false);

    // Sync state values with refs for use in drawing loops without dependency restarts
    useEffect(() => {
        countRef.current = count;
    }, [count]);

    useEffect(() => {
        isExplodingRef.current = isExploding;
    }, [isExploding]);

    useEffect(() => {
        let currentCount = 0;
        const interval = setInterval(() => {
            // Speed up or slow down randomly to make loading look organic
            const increment = Math.floor(Math.random() * 4) + 2; // 2% to 5% increments
            currentCount = Math.min(100, currentCount + increment);
            setCount(currentCount);

            if (currentCount === 100) {
                clearInterval(interval);
                setIsExploding(true);
                // Hold brief moment for the supernova explosion visual
                setTimeout(() => {
                    finishLoading();
                }, 600);
            }
        }, 45);

        return () => clearInterval(interval);
    }, [finishLoading]);

    // Full-canvas graphics loop (warped grid + 3D particle vortex + cursor sparks + core ripples + binary data drift)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize orbiting particles (Vortex)
        const particleCount = 140;
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                angle: Math.random() * Math.PI * 2,
                baseRadius: 75 + Math.random() * 50,
                speed: 0.006 + Math.random() * 0.012,
                yOffset: (Math.random() - 0.5) * 12,
                size: 1.0 + Math.random() * 1.6,
                colorRatio: Math.random(),
                vx: 0,
                vy: 0,
                drawX: 0,
                drawY: 0,
                drawScale: 1,
                drawAlpha: 1
            });
        }

        // Initialize magnetic grid points
        const gridSpacing = 70;
        let gridNodes = [];
        const initGrid = () => {
            gridNodes = [];
            const cols = Math.ceil(canvas.width / gridSpacing) + 1;
            const rows = Math.ceil(canvas.height / gridSpacing) + 1;
            for (let c = 0; c < cols; c++) {
                gridNodes[c] = [];
                for (let r = 0; r < rows; r++) {
                    gridNodes[c][r] = {
                        x: c * gridSpacing,
                        y: r * gridSpacing,
                        drawX: c * gridSpacing,
                        drawY: r * gridSpacing,
                        highlight: 0
                    };
                }
            }
        };
        initGrid();

        // Ripples state (gravitational ripples from center dial)
        const ripples = [];
        let rippleTimer = 0;

        // Data sparks state (metrics floating up)
        const dataSparks = [];
        const dataPool = [
            "01", "10", "FF", "A9", "0x3F", "SYS_INIT", "CORE_OK", 
            "LOAD_CORE", "MERN_V4", "PERN_V2", "SEC_PASS", "CONN_OK", 
            "OP_1", "OP_0", ">> GET", ">> POST", "DATA_STREAM", "PORT_80"
        ];

        // Cursor sparks state (trail particles)
        const cursorSparks = [];

        // Handle mouse tracking & spark spawns in a single listener
        const handleMouseMove = (e) => {
            const mouse = mouseRef.current;
            const dx = e.clientX - mouse.targetX;
            const dy = e.clientY - mouse.targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Spawn spark trails if cursor moves
            if (dist > 2 && cursorSparks.length < 50 && Math.random() < 0.35) {
                cursorSparks.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: (Math.random() - 0.5) * 2.5,
                    vy: (Math.random() - 0.5) * 2.5 - 0.5,
                    size: 1.0 + Math.random() * 1.8,
                    alpha: 0.85,
                    colorRatio: Math.random()
                });
            }

            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
        };

        // Initialize mouse in center
        mouseRef.current.targetX = window.innerWidth / 2;
        mouseRef.current.targetY = window.innerHeight / 2;
        mouseRef.current.x = window.innerWidth / 2;
        mouseRef.current.y = window.innerHeight / 2;

        window.addEventListener('mousemove', handleMouseMove);

        const render = () => {
            const isDark = document.documentElement.classList.contains('dark');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Lerp mouse coordinate values for fluid inertia
            const mouse = mouseRef.current;
            mouse.x += (mouse.targetX - mouse.x) * 0.06;
            mouse.y += (mouse.targetY - mouse.y) * 0.06;

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const loadVal = countRef.current;
            const isExplodingVal = isExplodingRef.current;

            // 1. Dynamic ripples updates
            rippleTimer++;
            if (rippleTimer % 120 === 0 && !isExplodingVal) {
                ripples.push({
                    radius: 0,
                    maxRadius: Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) * 0.55,
                    speed: 4 + Math.random() * 2,
                    intensity: 0.85
                });
            }

            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.radius += r.speed;
                r.intensity = 1.0 - (r.radius / r.maxRadius);
                if (r.radius > r.maxRadius || r.intensity <= 0) {
                    ripples.splice(i, 1);
                }
            }

            // 2. Warped grid calculation (Mouse warp + Ripple expansion)
            const cols = gridNodes.length;
            const rows = gridNodes[0] ? gridNodes[0].length : 0;
            const warpRadius = 220;
            const warpStrength = 0.28;

            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    const node = gridNodes[c][r];
                    
                    // Mouse warp
                    const dxMouse = node.x - mouse.x;
                    const dyMouse = node.y - mouse.y;
                    const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                    let mouseOffsetX = 0;
                    let mouseOffsetY = 0;

                    if (distMouse < warpRadius) {
                        const force = (warpRadius - distMouse) / warpRadius;
                        mouseOffsetX = -dxMouse * force * warpStrength;
                        mouseOffsetY = -dyMouse * force * warpStrength;
                    }

                    // Ripple offset
                    const dxCenter = node.x - centerX;
                    const dyCenter = node.y - centerY;
                    const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter) || 1;
                    let rippleOffsetX = 0;
                    let rippleOffsetY = 0;
                    let rippleHighlight = 0;

                    ripples.forEach((ripple) => {
                        const diff = Math.abs(distCenter - ripple.radius);
                        if (diff < 90) {
                            const rippleForce = (90 - diff) / 90 * ripple.intensity * 26;
                            rippleOffsetX += (dxCenter / distCenter) * rippleForce;
                            rippleOffsetY += (dyCenter / distCenter) * rippleForce;
                            rippleHighlight = Math.max(rippleHighlight, (90 - diff) / 90 * ripple.intensity);
                        }
                    });

                    node.drawX = node.x + mouseOffsetX + rippleOffsetX;
                    node.drawY = node.y + mouseOffsetY + rippleOffsetY;
                    node.highlight = rippleHighlight;
                }
            }

            // Draw grid lines
            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    const node = gridNodes[c][r];
                    
                    if (c < cols - 1) {
                        const nextNode = gridNodes[c + 1][r];
                        const avgHighlight = (node.highlight + nextNode.highlight) / 2;
                        
                        ctx.beginPath();
                        ctx.moveTo(node.drawX, node.drawY);
                        ctx.lineTo(nextNode.drawX, nextNode.drawY);
                        
                        if (avgHighlight > 0.05) {
                            ctx.strokeStyle = `rgba(184, 32, 230, ${0.05 + avgHighlight * 0.22})`;
                            ctx.lineWidth = 1 + avgHighlight * 0.8;
                        } else {
                            ctx.strokeStyle = isDark ? 'rgba(184, 32, 230, 0.04)' : 'rgba(184, 32, 230, 0.035)';
                            ctx.lineWidth = 1;
                        }
                        ctx.stroke();
                    }
                    
                    if (r < rows - 1) {
                        const nextNode = gridNodes[c][r + 1];
                        const avgHighlight = (node.highlight + nextNode.highlight) / 2;
                        
                        ctx.beginPath();
                        ctx.moveTo(node.drawX, node.drawY);
                        ctx.lineTo(nextNode.drawX, nextNode.drawY);
                        
                        if (avgHighlight > 0.05) {
                            ctx.strokeStyle = `rgba(184, 32, 230, ${0.05 + avgHighlight * 0.22})`;
                            ctx.lineWidth = 1 + avgHighlight * 0.8;
                        } else {
                            ctx.strokeStyle = isDark ? 'rgba(184, 32, 230, 0.04)' : 'rgba(184, 32, 230, 0.035)';
                            ctx.lineWidth = 1;
                        }
                        ctx.stroke();
                    }
                }
            }

            // 3. Draw Binary / Hex Data streams drifting upward
            if (dataSparks.length < 18 && Math.random() < 0.07 && !isExplodingVal) {
                dataSparks.push({
                    x: Math.random() * canvas.width,
                    y: canvas.height + 20,
                    vy: -(0.4 + Math.random() * 1.1),
                    text: dataPool[Math.floor(Math.random() * dataPool.length)],
                    alpha: 0.12 + Math.random() * 0.22,
                    scale: 0.8 + Math.random() * 0.3
                });
            }

            ctx.font = "9px monospace";
            ctx.textAlign = "center";
            for (let i = dataSparks.length - 1; i >= 0; i--) {
                const ds = dataSparks[i];
                ds.y += ds.vy;
                ds.alpha -= 0.0008;

                if (ds.y < -20 || ds.alpha <= 0) {
                    dataSparks.splice(i, 1);
                    continue;
                }

                ctx.fillStyle = isDark 
                    ? `rgba(218, 125, 32, ${ds.alpha * 0.8})`
                    : `rgba(184, 32, 230, ${ds.alpha * 0.55})`;
                ctx.fillText(ds.text, ds.x, ds.y);
            }

            // 4. Draw Cursor trail sparks
            for (let i = cursorSparks.length - 1; i >= 0; i--) {
                const s = cursorSparks[i];
                s.x += s.vx;
                s.y += s.vy;
                s.alpha -= 0.016;

                if (s.alpha <= 0) {
                    cursorSparks.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fillStyle = s.colorRatio > 0.5 
                    ? `rgba(184, 32, 230, ${s.alpha})`
                    : `rgba(218, 125, 32, ${s.alpha})`;
                ctx.fill();
            }

            // 5. Draw Quantum Particle Vortex Core
            particles.forEach((p) => {
                if (!isExplodingVal) {
                    const speedMultiplier = 1 + (loadVal / 100) * 7;
                    p.angle += p.speed * speedMultiplier;

                    const currentRadius = p.baseRadius * (1 - (loadVal / 100) * 0.3);

                    const x = Math.cos(p.angle) * currentRadius;
                    const z = Math.sin(p.angle) * currentRadius;
                    const y = p.yOffset + Math.sin(p.angle * 2) * 4;

                    const tilt = 0.6;
                    const rotatedY = y * Math.cos(tilt) - z * Math.sin(tilt);
                    const rotatedZ = y * Math.sin(tilt) + z * Math.cos(tilt);

                    const perspective = 250;
                    const scale = perspective / (perspective + rotatedZ);

                    p.drawX = centerX + x * scale;
                    p.drawY = centerY + rotatedY * scale;
                    p.drawScale = scale;
                    p.drawAlpha = Math.max(0.1, Math.min(1.0, scale));
                } else {
                    if (!p.vx && !p.vy) {
                        const dx = p.drawX - centerX;
                        const dy = p.drawY - centerY;
                        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                        const velocityFactor = 12 + Math.random() * 14;
                        p.vx = (dx / dist) * velocityFactor;
                        p.vy = (dy / dist) * velocityFactor;
                    }
                    p.drawX += p.vx;
                    p.drawY += p.vy;
                    p.drawAlpha = Math.max(0, p.drawAlpha - 0.04);
                }

                if (p.drawAlpha > 0) {
                    ctx.beginPath();
                    ctx.arc(p.drawX, p.drawY, p.size * p.drawScale, 0, Math.PI * 2);
                    
                    const calculatedAlpha = p.drawAlpha * 0.9;
                    const color = p.colorRatio > 0.45 
                        ? `rgba(184, 32, 230, ${calculatedAlpha})`
                        : `rgba(218, 125, 32, ${calculatedAlpha})`;
                        
                    ctx.fillStyle = color;
                    ctx.shadowBlur = 6 * p.drawScale;
                    ctx.shadowColor = p.colorRatio > 0.45 ? '#b820e6' : '#da7d20';
                    ctx.fill();
                }
            });
            ctx.shadowBlur = 0;

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Message indexing based on count
    const messageIndex = Math.min(
        messages.length - 1,
        Math.floor((count / 100) * messages.length)
    );

    // SVG path morph curves for premium liquid curtains
    const svgPathVariantsMain = {
        initial: {
            d: "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
        },
        exit: {
            d: [
                "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z",
                "M 0 0 L 100 0 L 100 100 Q 50 0 0 100 Z",
                "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z"
            ],
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                times: [0, 0.38, 1]
            }
        }
    };

    const svgPathVariantsTrailing = {
        initial: {
            d: "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
        },
        exit: {
            d: [
                "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z",
                "M 0 0 L 100 0 L 100 100 Q 50 0 0 100 Z",
                "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z"
            ],
            transition: {
                duration: 0.9,
                ease: [0.76, 0, 0.24, 1],
                times: [0, 0.38, 1],
                delay: 0.06
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: [1, 1, 0],
                transition: { duration: 0.96, times: [0, 0.9, 1] }
            }}
            className="fixed inset-0 w-screen h-screen z-[99999] flex flex-col items-center justify-center overflow-hidden bg-transparent"
        >
            {/* Morphing Liquid Curtain SVGs */}
            <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
            >
                {/* Delayed Trailing Wave */}
                <motion.path
                    variants={svgPathVariantsTrailing}
                    initial="initial"
                    exit="exit"
                    fill="url(#curtain-trail-grad)"
                />
                {/* Main Curtain */}
                <motion.path
                    variants={svgPathVariantsMain}
                    initial="initial"
                    exit="exit"
                    className="fill-slate-50 dark:fill-[#11001F]"
                />
                
                <defs>
                    <linearGradient id="curtain-trail-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#b820e6" />
                        <stop offset="100%" stopColor="#da7d20" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Background interactive Canvas layer */}
            <motion.canvas
                ref={canvasRef}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
            />

            {/* Ambient Background Glow Nodes */}
            <motion.div 
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#b820e6]/5 dark:bg-[#b820e6]/3 blur-[100px] pointer-events-none z-0 animate-pulse" 
            />
            <motion.div 
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#da7d20]/5 dark:bg-[#da7d20]/2 blur-[120px] pointer-events-none z-0 animate-pulse" 
                style={{ animationDelay: '1s' }} 
            />

            {/* Dashboard and HUD elements */}
            <motion.div
                exit={{
                    opacity: 0,
                    scale: 0.8,
                    y: -35,
                    transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] }
                }}
                className="z-10 flex flex-col items-center justify-center px-6"
            >
                {/* Glowing Developer Branding Tag */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-lg md:text-xl font-bold font-Ovo tracking-widest flex items-center cursor-default mb-6 text-slate-700 dark:text-white"
                >
                    <span className="text-slate-400 dark:text-slate-500 font-light">&lt;</span>
                    <span className="bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent font-extrabold px-1.5">
                        aman.dev
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 font-light">/&gt;</span>
                </motion.div>

                {/* Interactive Concentric Dial Container */}
                <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
                    
                    {/* Spinning tech gear 1 */}
                    <svg className="absolute w-full h-full animate-[spin_20s_linear_infinite] opacity-60" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" className="text-slate-300 dark:text-white/5" strokeWidth="1" strokeDasharray="4, 12" />
                    </svg>

                    {/* Counter-rotating tech gear 2 */}
                    <svg className="absolute w-full h-full animate-[spin_12s_linear_infinite_reverse] opacity-75" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" className="text-slate-400 dark:text-white/10" strokeWidth="1.5" strokeDasharray="30, 25" />
                    </svg>

                    {/* Circle progress bar dial */}
                    <svg className="absolute w-full h-full -rotate-90 scale-95" viewBox="0 0 200 200">
                        <defs>
                            <linearGradient id="dial-progress-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#b820e6" />
                                <stop offset="100%" stopColor="#da7d20" />
                            </linearGradient>
                        </defs>
                        {/* Background track circle */}
                        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/5" strokeWidth="3" />
                        {/* Fulfilling progress circle */}
                        <motion.circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="url(#dial-progress-grad)"
                            strokeWidth="4.5"
                            strokeDasharray={2 * Math.PI * 80}
                            animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - count / 100) }}
                            transition={{ ease: "easeOut", duration: 0.15 }}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Active Tick Indicators (24 nodes) */}
                    <div className="absolute w-[150px] h-[150px] rounded-full flex items-center justify-center">
                        {Array.from({ length: 24 }).map((_, i) => {
                            const angle = (i * 360) / 24;
                            const isActive = i / 24 < count / 100;
                            return (
                                <div
                                    key={i}
                                    className={`absolute w-[2px] h-[7px] origin-[center_75px] transition-all duration-300 ${
                                        isActive 
                                            ? 'bg-gradient-to-b from-[#b820e6] to-[#da7d20] shadow-[0_0_6px_#b820e6] scale-y-125' 
                                            : 'bg-slate-300 dark:bg-white/10'
                                    }`}
                                    style={{
                                        transform: `rotate(${angle}deg)`,
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Center details within blur backdrop */}
                    <div className="absolute w-[130px] h-[130px] rounded-full bg-slate-50/45 dark:bg-white/[0.02] backdrop-blur-[6px] border border-slate-200/50 dark:border-white/5 flex flex-col items-center justify-center shadow-lg overflow-hidden">
                        
                        {/* AI Avatar Image */}
                        <motion.img
                            src="/assets/aman-ai-avatar.png"
                            alt="Aman AI Avatar"
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-14 h-14 rounded-full object-cover border border-slate-200/40 dark:border-white/10 shadow-[0_0_12px_rgba(184,32,230,0.2)] mb-1"
                        />

                        {/* Large digital percentage counter */}
                        <span className="text-2xl md:text-3xl font-extrabold font-mono tracking-tighter bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent select-none">
                            {count.toString().padStart(3, '0')}%
                        </span>
                    </div>
                </div>

                {/* Cyber Decrypting Status Messages */}
                <div className="h-6 mt-10 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={messageIndex}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 0.8, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.22 }}
                            className="text-xs md:text-sm font-mono tracking-widest text-slate-500 dark:text-slate-400 text-center uppercase"
                        >
                            <DecryptText text={messages[messageIndex]} />
                        </motion.p>
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}
