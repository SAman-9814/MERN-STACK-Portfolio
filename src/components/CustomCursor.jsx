import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth springs for the outer trailing ring
    const springConfig = { damping: 25, stiffness: 220, mass: 0.4 };
    const cursorSpringX = useSpring(cursorX, springConfig);
    const cursorSpringY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const checkDevice = () => {
            const hasTouch = window.matchMedia('(pointer: coarse)').matches;
            const isSmallScreen = window.innerWidth < 768;
            setIsMobile(hasTouch || isSmallScreen);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        if (isMobile) return;

        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            if (!e.target) return;
            const target = e.target;
            const isInteractive = target.closest('a, button, input, textarea, [role="button"], .interactive-hover');
            setIsHovered(!!isInteractive);
        };

        const handleMouseLeaveWindow = () => {
            setIsVisible(false);
        };

        const handleMouseEnterWindow = () => {
            setIsVisible(true);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeaveWindow);
        document.addEventListener('mouseenter', handleMouseEnterWindow);

        return () => {
            window.removeEventListener('resize', checkDevice);
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeaveWindow);
            document.removeEventListener('mouseenter', handleMouseEnterWindow);
        };
    }, [isMobile, isVisible, cursorX, cursorY]);

    if (isMobile || !isVisible) return null;

    return (
        <>
            {/* Outer trailing ring with difference blend mode */}
            <motion.div
                style={{
                    left: cursorSpringX,
                    top: cursorSpringY,
                    x: '-50%',
                    y: '-50%',
                    zIndex: 999999,
                }}
                animate={{
                    width: isHovered ? 56 : 24,
                    height: isHovered ? 56 : 24,
                    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    borderColor: isHovered ? 'rgba(255, 255, 255, 1)' : 'rgba(184, 32, 230, 0.65)',
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
                className="fixed pointer-events-none rounded-full border-2 mix-blend-difference hidden md:block"
            />

            {/* Inner precision core dot */}
            <motion.div
                style={{
                    left: cursorX,
                    top: cursorY,
                    x: '-50%',
                    y: '-50%',
                    zIndex: 999999,
                }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                }}
                className="fixed w-2.5 h-2.5 bg-gradient-to-r from-[#b820e6] to-[#da7d20] rounded-full pointer-events-none hidden md:block"
            />
        </>
    );
}
