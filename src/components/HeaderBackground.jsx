import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Class to manage custom cursor trails (micro-sparks)
class Spark {
    constructor(x, y, w, h) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2.0;
        this.vy = (Math.random() - 0.5) * 2.0 - 0.5; // subtle upward float
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = 1.0;
        this.decay = Math.random() * 0.025 + 0.02; // decays in 30-50 frames
        this.colorType = Math.random() > 0.5 ? 'purple' : 'orange';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        this.vx *= 0.95; // damping
        this.vy *= 0.95;
    }

    draw(ctx, isDark) {
        if (this.alpha <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        let color;
        if (isDark) {
            color = this.colorType === 'purple'
                ? `rgba(184, 32, 230, ${this.alpha})`
                : `rgba(218, 125, 32, ${this.alpha})`;
        } else {
            color = this.colorType === 'purple'
                ? `rgba(139, 92, 246, ${this.alpha * 0.8})`
                : `rgba(249, 115, 22, ${this.alpha * 0.8})`;
        }
        ctx.fillStyle = color;
        ctx.fill();
    }
}

// Class to manage background twinkling stars
class Star {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.radius = Math.random() * 0.8 + 0.3; // micro-stars
        this.vx = (Math.random() - 0.5) * 0.04; // drift extremely slowly
        this.vy = (Math.random() - 0.5) * 0.04;
        this.baseAlpha = Math.random() * 0.45 + 0.15;
        this.alpha = this.baseAlpha;
        this.twinkleSpeed = Math.random() * 0.018 + 0.006;
        this.twinklePhase = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap stars around screen limits
        if (this.x < 0) this.x = this.w;
        if (this.x > this.w) this.x = 0;
        if (this.y < 0) this.y = this.h;
        if (this.y > this.h) this.y = 0;

        // Twinkle phase calculations
        this.twinklePhase += this.twinkleSpeed;
        this.alpha = Math.max(0.05, this.baseAlpha + Math.sin(this.twinklePhase) * 0.18);
    }

    draw(ctx, isDark) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        if (isDark) {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        } else {
            ctx.fillStyle = `rgba(107, 114, 128, ${this.alpha * 0.55})`;
        }
        ctx.fill();
    }
}

export default function HeaderBackground() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, active: false });
    const lastMouseRef = useRef({ x: 0, y: 0 });
    const shockwavesRef = useRef([]);
    const sparksRef = useRef([]);
    const meteorsRef = useRef([]);
    const timeRef = useRef(0);

    // Track mouse coordinates
    const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
    const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

    // Dynamic mouse spring values for smooth tracking
    const springConfig1 = { stiffness: 60, damping: 25, mass: 0.5 };
    const springX1 = useSpring(mouseX, springConfig1);
    const springY1 = useSpring(mouseY, springConfig1);

    const springConfig2 = { stiffness: 35, damping: 20, mass: 0.8 };
    const springX2 = useSpring(mouseX, springConfig2);
    const springY2 = useSpring(mouseY, springConfig2);

    // Center-offset positions for glowing blobs (to keep them centered under cursor)
    const glow1X = useTransform(springX1, (x) => x - 192); // 192 = 384/2 (w-96)
    const glow1Y = useTransform(springY1, (y) => y - 192);

    const glow2X = useTransform(springX2, (x) => x - 256); // 256 = 512/2 (w-128)
    const glow2Y = useTransform(springY2, (y) => y - 256);

    // Parallax transformation offsets based on cursor distance from center of screen
    const parallax1X = useTransform(springX1, (x) => (x - (window?.innerWidth || 1200) / 2) * 0.05);
    const parallax1Y = useTransform(springY1, (y) => (y - (window?.innerHeight || 800) / 2) * 0.05);

    const parallax2X = useTransform(springX2, (x) => (x - (window?.innerWidth || 1200) / 2) * -0.07);
    const parallax2Y = useTransform(springY2, (y) => (y - (window?.innerHeight || 800) / 2) * -0.07);

    const parallax3X = useTransform(springX1, (x) => (x - (window?.innerWidth || 1200) / 2) * 0.03);
    const parallax3Y = useTransform(springY2, (y) => (y - (window?.innerHeight || 800) / 2) * -0.04);

    // Setup window-level mouse event handlers
    useEffect(() => {
        const handleWindowMouseMove = (e) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const canvasX = e.clientX - rect.left;
            const canvasY = e.clientY - rect.top;

            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Calculate velocity
            const dx = e.clientX - lastMouseRef.current.x;
            const dy = e.clientY - lastMouseRef.current.y;
            const speed = Math.sqrt(dx * dx + dy * dy);

            // Generate sparks if cursor moves quickly inside canvas limits
            if (speed > 4 && mouseRef.current.active) {
                const numSparks = Math.min(3, Math.floor(speed / 5));
                for (let i = 0; i < numSparks; i++) {
                    sparksRef.current.push(new Spark(canvasX, canvasY, rect.width, rect.height));
                }
            }

            lastMouseRef.current.x = e.clientX;
            lastMouseRef.current.y = e.clientY;

            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            mouseRef.current.active = true;
        };

        const handleWindowMouseEnter = (e) => {
            lastMouseRef.current.x = e.clientX;
            lastMouseRef.current.y = e.clientY;
            mouseRef.current.active = true;
        };

        const handleWindowMouseLeave = () => {
            mouseRef.current.active = false;
        };

        const handleWindowClick = (e) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            // Spawn expanding circular ripple on click within canvas bounds
            if (clickX >= 0 && clickX <= rect.width && clickY >= 0 && clickY <= rect.height) {
                shockwavesRef.current.push({
                    x: clickX,
                    y: clickY,
                    radius: 0,
                    maxRadius: 190,
                    speed: 4.8,
                    force: 13,
                });
            }
        };

        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('mouseenter', handleWindowMouseEnter);
        document.addEventListener('mouseleave', handleWindowMouseLeave);
        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('mouseenter', handleWindowMouseEnter);
            document.removeEventListener('mouseleave', handleWindowMouseLeave);
            window.removeEventListener('click', handleWindowClick);
        };
    }, [mouseX, mouseY]);

    // HTML5 Canvas particle system logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let particles = [];
        let stars = [];
        const maxParticles = window.innerWidth < 640 ? 30 : 60;
        const maxStars = window.innerWidth < 640 ? 55 : 110;

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            initParticles(rect.width, rect.height);
        };

        class Particle {
            constructor(w, h) {
                this.w = w;
                this.h = h;
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 1.5 + 1.2;
                this.colorType = Math.random() > 0.5 ? 'purple' : 'orange';
                this.baseAlpha = Math.random() * 0.32 + 0.22;
                this.alpha = this.baseAlpha;
            }

            update(mw, mh, mActive, time) {
                // Natural movement velocities
                this.x += this.vx;
                this.y += this.vy;

                // Organic noise wind turbulence
                const windX = Math.sin(time + this.y * 0.007) * 0.06;
                const windY = Math.cos(time + this.x * 0.007) * 0.04;
                this.x += windX;
                this.y += windY;

                // Kinetic drag friction to settle forces back to base speeds over time
                this.vx *= 0.97;
                this.vy *= 0.97;

                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                const minSpeed = 0.16;
                if (speed < minSpeed && speed > 0) {
                    this.vx = (this.vx / speed) * minSpeed;
                    this.vy = (this.vy / speed) * minSpeed;
                }

                // Handle screen bounds bounce
                if (this.x < 0 || this.x > this.w) this.vx *= -1;
                if (this.y < 0 || this.y > this.h) this.vy *= -1;

                // Repel particles from mouse cursor
                if (mActive) {
                    const dx = this.x - mw;
                    const dy = this.y - mh;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 130) {
                        const force = (130 - dist) / 130;
                        const angle = Math.atan2(dy, dx);
                        // Repulsion impulse
                        this.x += Math.cos(angle) * force * 1.8;
                        this.y += Math.sin(angle) * force * 1.8;
                    }
                }
            }

            draw(c, isDark) {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

                let color;
                if (isDark) {
                    color = this.colorType === 'purple'
                        ? `rgba(184, 32, 230, ${this.alpha})`
                        : `rgba(218, 125, 32, ${this.alpha})`;
                } else {
                    color = this.colorType === 'purple'
                        ? `rgba(139, 92, 246, ${this.alpha * 0.7})`
                        : `rgba(249, 115, 22, ${this.alpha * 0.7})`;
                }
                c.fillStyle = color;
                c.fill();
            }
        }

        const initParticles = (w, h) => {
            // Setup constellation nodes
            particles = [];
            for (let i = 0; i < maxParticles; i++) {
                particles.push(new Particle(w, h));
            }

            // Setup twinkling stars background layer
            stars = [];
            for (let i = 0; i < maxStars; i++) {
                stars.push(new Star(w, h));
            }
        };

        const drawConnections = (isDark) => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        const alpha = ((100 - dist) / 100) * 0.13;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);

                        let strokeStyle;
                        if (isDark) {
                            strokeStyle = p1.colorType === 'purple'
                                ? `rgba(184, 32, 230, ${alpha})`
                                : `rgba(218, 125, 32, ${alpha})`;
                        } else {
                            strokeStyle = p1.colorType === 'purple'
                                ? `rgba(139, 92, 246, ${alpha * 0.6})`
                                : `rgba(249, 115, 22, ${alpha * 0.6})`;
                        }
                        ctx.strokeStyle = strokeStyle;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        const drawMouseConnections = (mw, mh, isDark) => {
            particles.forEach((p) => {
                const dx = p.x - mw;
                const dy = p.y - mh;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    const alpha = ((120 - dist) / 120) * 0.22;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mw, mh);

                    let strokeStyle;
                    if (isDark) {
                        strokeStyle = p.colorType === 'purple'
                            ? `rgba(184, 32, 230, ${alpha})`
                            : `rgba(218, 125, 32, ${alpha})`;
                    } else {
                        strokeStyle = p.colorType === 'purple'
                            ? `rgba(139, 92, 246, ${alpha * 0.6})`
                            : `rgba(249, 115, 22, ${alpha * 0.6})`;
                    }
                    ctx.strokeStyle = strokeStyle;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            });
        };

        const tick = () => {
            const isDark = document.documentElement.classList.contains('dark');
            const rect = canvas.getBoundingClientRect();

            ctx.clearRect(0, 0, rect.width, rect.height);

            // Increment organic noise wind time
            timeRef.current += 0.005;

            const mw = mouseRef.current.x - rect.left;
            const mh = mouseRef.current.y - rect.top;
            const mActive = mouseRef.current.active;

            // 1. Update and draw background twinkling stars layer
            stars.forEach((star) => {
                star.update();
                star.draw(ctx, isDark);
            });

            // 2. Spawn and update diagonally streaking shooting stars (meteors)
            if (Math.random() < 0.006 && meteorsRef.current.length < 3) {
                const startX = Math.random() * rect.width;
                const startY = Math.random() * (rect.height * 0.25); // spawn in top portion
                meteorsRef.current.push({
                    x: startX,
                    y: startY,
                    length: Math.random() * 110 + 60,
                    speed: Math.random() * 9 + 6,
                    angle: Math.PI / 5.5 + (Math.random() - 0.5) * 0.08, // diagonal path
                    opacity: 1.0,
                    decay: Math.random() * 0.016 + 0.01,
                    colorType: Math.random() > 0.5 ? 'purple' : 'orange'
                });
            }

            meteorsRef.current.forEach((m) => {
                const endX = m.x - Math.cos(m.angle) * m.length;
                const endY = m.y - Math.sin(m.angle) * m.length;

                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(endX, endY);

                const grad = ctx.createLinearGradient(m.x, m.y, endX, endY);
                if (isDark) {
                    grad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
                    grad.addColorStop(0.3, m.colorType === 'purple'
                        ? `rgba(184, 32, 230, ${m.opacity * 0.7})`
                        : `rgba(218, 125, 32, ${m.opacity * 0.7})`);
                    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                } else {
                    grad.addColorStop(0, `rgba(124, 58, 237, ${m.opacity * 0.75})`);
                    grad.addColorStop(0.3, m.colorType === 'purple'
                        ? `rgba(184, 32, 230, ${m.opacity * 0.35})`
                        : `rgba(249, 115, 22, ${m.opacity * 0.35})`);
                    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                }

                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.6;
                ctx.stroke();

                // Advance coordinates
                m.x += Math.cos(m.angle) * m.speed;
                m.y += Math.sin(m.angle) * m.speed;
                m.opacity -= m.decay;
            });
            meteorsRef.current = meteorsRef.current.filter((m) => m.opacity > 0);

            // 3. Draw mouse connection glow halo
            if (mActive) {
                ctx.beginPath();
                const glowGrad = ctx.createRadialGradient(mw, mh, 0, mw, mh, 110);
                if (isDark) {
                    glowGrad.addColorStop(0, 'rgba(184, 32, 230, 0.04)');
                    glowGrad.addColorStop(1, 'rgba(184, 32, 230, 0)');
                } else {
                    glowGrad.addColorStop(0, 'rgba(139, 92, 246, 0.025)');
                    glowGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
                }
                ctx.fillStyle = glowGrad;
                ctx.arc(mw, mh, 110, 0, Math.PI * 2);
                ctx.fill();
            }

            // 4. Update and draw click shockwaves
            shockwavesRef.current.forEach((sw) => {
                sw.radius += sw.speed;

                // Draw expanding visual shockwave ring
                ctx.beginPath();
                ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
                const alpha = (1 - sw.radius / sw.maxRadius) * 0.28;
                ctx.strokeStyle = isDark
                    ? `rgba(218, 125, 32, ${alpha})`
                    : `rgba(184, 32, 230, ${alpha})`;
                ctx.lineWidth = 1.6;
                ctx.stroke();

                // Blaster-physics pushing particles along radial vectors
                particles.forEach((p) => {
                    const dx = p.x - sw.x;
                    const dy = p.y - sw.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (Math.abs(dist - sw.radius) < 20 && dist > 0) {
                        const forceFactor = (1 - Math.abs(dist - sw.radius) / 20) * sw.force;
                        const angle = Math.atan2(dy, dx);

                        p.vx += Math.cos(angle) * forceFactor * 0.09;
                        p.vy += Math.sin(angle) * forceFactor * 0.09;

                        // Soft speed clamp to prevent wild particle exits
                        const maxSpeed = 3.6;
                        const pSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                        if (pSpeed > maxSpeed) {
                            p.vx = (p.vx / pSpeed) * maxSpeed;
                            p.vy = (p.vy / pSpeed) * maxSpeed;
                        }
                    }
                });
            });

            // Filter dead shockwaves
            shockwavesRef.current = shockwavesRef.current.filter((sw) => sw.radius < sw.maxRadius);

            // 5. Update and draw constellation particles
            particles.forEach((p) => {
                p.update(mw, mh, mActive, timeRef.current);
                p.draw(ctx, isDark);
            });

            // 6. Draw connection lines
            drawConnections(isDark);

            // 7. Draw interactive mouse connection web
            if (mActive) {
                drawMouseConnections(mw, mh, isDark);
            }

            // 8. Update and draw sparks
            sparksRef.current.forEach((spark) => {
                spark.update();
                spark.draw(ctx, isDark);
            });
            sparksRef.current = sparksRef.current.filter((s) => s.alpha > 0);

            animationFrameId = requestAnimationFrame(tick);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        tick();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    // Synchronize initial center coordinates on mount
    useEffect(() => {
        mouseX.set(window.innerWidth / 2);
        mouseY.set(window.innerHeight / 2);
    }, [mouseX, mouseY]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto -z-10"
        >
            {/* Interactive Ambient Aurora Glows */}
            <motion.div
                style={{ x: glow1X, y: glow1Y }}
                className="absolute rounded-full w-96 h-96 bg-gradient-to-r from-[#b820e6]/12 to-[#7c3aed]/5 blur-[100px] pointer-events-none -z-20"
            />
            <motion.div
                style={{ x: glow2X, y: glow2Y }}
                className="absolute rounded-full w-[512px] h-[512px] bg-gradient-to-r from-[#da7d20]/8 to-[#b820e6]/4 blur-[120px] pointer-events-none -z-20"
            />

            {/* Neural Interactive Particle Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

            {/* Parallax SVG geometric vectors */}
            {/* Top Left: 3D Diamond Octahedron wireframe */}
            <motion.div
                style={{ x: parallax1X, y: parallax1Y }}
                animate={{ rotate: 360, y: [0, 15, 0] }}
                transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                    y: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="absolute top-1/4 left-8 md:left-24 pointer-events-none opacity-60 dark:opacity-40"
            >
                <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 5 L90 50 L50 95 L10 50 Z" stroke="url(#purpleGrad)" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M50 5 L50 95" stroke="url(#purpleGrad)" strokeWidth="0.8" strokeDasharray="3 3" />
                    <path d="M10 50 L90 50" stroke="url(#purpleGrad)" strokeWidth="0.8" strokeDasharray="3 3" />
                    <defs>
                        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#b820e6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* Bottom Right: Concentric Orbit Rings */}
            <motion.div
                style={{ x: parallax2X, y: parallax2Y }}
                animate={{ rotate: -360, y: [0, -18, 0] }}
                transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
                    y: { duration: 9, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="absolute bottom-1/4 right-8 md:right-24 pointer-events-none opacity-60 dark:opacity-40"
            >
                <svg width="90" height="90" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="50" stroke="url(#orangeGrad)" strokeWidth="1.5" />
                    <circle cx="60" cy="60" r="30" stroke="url(#orangeGrad)" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="60" cy="60" r="10" fill="url(#orangeGrad)" fillOpacity="0.1" />
                    <defs>
                        <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#da7d20" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* Center-Right: Tech Hexagon wireframe */}
            <motion.div
                style={{ x: parallax3X, y: parallax3Y }}
                animate={{ rotate: 180, scale: [1, 1.05, 1] }}
                transition={{
                    rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="absolute top-1/3 right-1/4 pointer-events-none opacity-40 dark:opacity-30"
            >
                <svg width="60" height="60" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="45,5 85,28 85,72 45,85 5,72 5,28" stroke="url(#mixedGrad)" strokeWidth="1.5" />
                    <line x1="45" y1="5" x2="45" y2="85" stroke="url(#mixedGrad)" strokeWidth="0.8" strokeDasharray="3 3" />
                    <defs>
                        <linearGradient id="mixedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#b820e6" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#da7d20" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>
        </div>
    );
}
