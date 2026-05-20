import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';

export default function TiltCard({ children, className = '', glowColor = 'rgba(184, 32, 230, 0.15)' }) {
    const cardRef = useRef(null);

    // Track mouse cursor relative position inside the card (-0.5 to 0.5)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics mapping for tilt rotations (max 15 degrees)
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 250, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 250, damping: 20 });

    // Interactive reflection/shine effects
    const shineX = useSpring(useTransform(x, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 250, damping: 20 });
    const shineY = useSpring(useTransform(y, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 250, damping: 20 });
    const shineBg = useMotionTemplate`radial-gradient(circle 200px at ${shineX} ${shineY}, rgba(255, 255, 255, 0.15), transparent)`;

    // Interactive hover shadow glow
    const glowX = useSpring(useTransform(x, [-0.5, 0.5], ["-20%", "20%"]), { stiffness: 250, damping: 20 });
    const glowY = useSpring(useTransform(y, [-0.5, 0.5], ["-20%", "20%"]), { stiffness: 250, damping: 20 });
    const glowBg = useMotionTemplate`radial-gradient(circle 180px at calc(50% + ${glowX}) calc(50% + ${glowY}), ${glowColor}, transparent)`;

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        x.set(mouseX / rect.width);
        y.set(mouseY / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            style={{ perspective: 1000 }}
            className="w-full h-full"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                className={`relative w-full h-full transition-shadow duration-300 ${className}`}
            >
                {/* 3D Dynamic Glow Shadow Overlay */}
                <motion.div
                    className="absolute -inset-2 rounded-[inherit] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 blur-xl z-0"
                    style={{ background: glowBg }}
                />

                {/* Card content container with offset depth */}
                <div style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }} className="relative z-10 w-full h-full">
                    {children}
                </div>

                {/* 3D Dynamic Light/Shine Reflection Overlay */}
                <motion.div
                    className="absolute inset-0 rounded-[inherit] pointer-events-none mix-blend-overlay z-20"
                    style={{ background: shineBg }}
                />
            </motion.div>
        </div>
    );
}
