import { motion } from 'framer-motion';

export default function WordReveal({ text, className = "", delay = 0 }) {
    const words = text.split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: 0.08
            }
        }
    };

    const wordVariants = {
        hidden: { y: "110%", opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 90,
                damping: 14,
                mass: 0.8
            }
        }
    };

    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className={`inline-flex flex-wrap ${className}`}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.2em] pb-[0.05em] leading-tight">
                    <motion.span variants={wordVariants} className="inline-block origin-bottom-left">
                        {word === "" ? "\u00A0" : word}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}
