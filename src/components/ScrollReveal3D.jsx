import { motion } from 'framer-motion';

export default function ScrollReveal3D({ children, delay = 0, duration = 0.8, className = '' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 15, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1], // Custom ease-out expo for premium feel
            }}
            style={{ transformOrigin: 'top center', perspective: 1200 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
