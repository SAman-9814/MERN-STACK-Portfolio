import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Magnetic({ children, range = 0.35, className = "inline-block" }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        
        // Center coordinates of the element
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        
        // Shift position towards mouse within the scaled range
        setPosition({ x: x * range, y: y * range });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
