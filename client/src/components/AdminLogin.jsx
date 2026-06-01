import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import CustomCursor from './CustomCursor';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to dashboard if already logged in
        const token = localStorage.getItem('adminToken');
        if (token) {
            navigate('/admin/dashboard');
        }

        // Set initial theme state
        setIsDark(document.documentElement.classList.contains('dark'));
    }, [navigate]);

    useEffect(() => {
        document.body.classList.add('admin-route');
        return () => {
            document.body.classList.remove('admin-route');
        };
    }, []);

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        const darkActive = document.documentElement.classList.contains('dark');
        localStorage.theme = darkActive ? 'dark' : 'light';
        setIsDark(darkActive);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/api/auth/login', { username, password });
            localStorage.setItem('adminToken', response.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    // Staggered Entrance Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 90,
                damping: 18,
                staggerChildren: 0.08,
                delayChildren: 0.05
            }
        }
    };

    const childVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 120 }
        }
    };

    return (
        <>
            <CustomCursor />
            <div className="min-h-screen w-full flex items-center justify-center bg-rose-50/30 dark:bg-darkTheme text-gray-800 dark:text-white font-Ovo relative overflow-hidden transition-colors duration-300">
            {/* Ambient Background Glows */}
            <motion.div 
                animate={{
                    x: [0, 35, -20, 0],
                    y: [0, -25, 20, 0],
                    scale: [1, 1.08, 0.92, 1]
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#b820e6]/5 dark:bg-[#b820e6]/10 rounded-full blur-[120px] pointer-events-none" 
            />
            <motion.div 
                animate={{
                    x: [0, -25, 35, 0],
                    y: [0, 20, -25, 0],
                    scale: [1, 0.94, 1.08, 1]
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#da7d20]/5 dark:bg-[#da7d20]/10 rounded-full blur-[120px] pointer-events-none" 
            />

            {/* Central Rotating Backlight Ambient Glow */}
            <motion.div 
                animate={{
                    scale: [1, 1.15, 0.9, 1],
                    rotate: [0, 90, 180, 360]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute w-[380px] h-[380px] bg-gradient-to-r from-[#b820e6]/10 to-[#da7d20]/10 dark:from-[#b820e6]/20 dark:to-[#da7d20]/20 rounded-full blur-[100px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" 
            />

            {/* Theme Toggle Button (Top Right) */}
            <div className="absolute top-6 right-6 z-20">
                <Magnetic range={0.4}>
                    <button 
                        onClick={toggleTheme} 
                        className="p-3 rounded-full border border-gray-300 dark:border-white/20 bg-white/50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-all shadow-sm"
                    >
                        <img src={isDark ? "/assets/sun_icon.png" : "/assets/moon_icon.png"} alt="" className="w-5" />
                    </button>
                </Magnetic>
            </div>

            <div className="w-full max-w-md mx-4 z-10">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white/75 dark:bg-[#11001F]/45 border border-gray-200/50 dark:border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-purple-500/20 dark:hover:border-purple-500/20 transition-all duration-500 relative"
                >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#b820e6] to-[#da7d20] rounded-t-3xl" />
                    
                    {/* Glass sheen reflection sweep on load */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl pointer-events-none z-0">
                        <motion.div
                            initial={{ left: '-150%' }}
                            animate={{ left: '150%' }}
                            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.6 }}
                            className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 dark:via-white/5 to-transparent skew-x-12"
                        />
                    </div>
                    
                    {/* Header */}
                    <motion.div variants={childVariants} className="text-center mb-8 pt-4">
                        <span className="text-2xl font-bold tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                            <span className="text-gray-800/60 dark:text-white/60">&lt;</span>
                            <span className="bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent">aman.dev</span>
                            <span className="text-gray-800/60 dark:text-white/60">/&gt;</span>
                        </span>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-4 tracking-wide font-Outfit">Admin Authentication</h2>
                        <p className="text-sm text-gray-500 dark:text-white/50 mt-1">Please sign in to access the control panel</p>
                    </motion.div>

                    {/* Alert */}
                    {error && (
                        <motion.div 
                            variants={childVariants} 
                            className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs text-center font-medium animate-pulse"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <motion.div variants={childVariants}>
                            <label className="block text-[11px] font-semibold text-gray-600 dark:text-white/70 uppercase tracking-widest mb-2" htmlFor="username">
                                Username
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400 dark:text-white/30">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                </span>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-[#11001F]/50 border border-gray-300 dark:border-white/10 focus:border-[#b820e6] dark:focus:border-purple-500 rounded-xl text-sm text-gray-800 dark:text-white outline-none transition duration-300 focus:shadow-[0_0_15px_rgba(184,32,230,0.12)]"
                                    placeholder="Enter admin username"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={childVariants}>
                            <label className="block text-[11px] font-semibold text-gray-600 dark:text-white/70 uppercase tracking-widest mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400 dark:text-white/30">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                </span>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-[#11001F]/50 border border-gray-300 dark:border-white/10 focus:border-[#b820e6] dark:focus:border-purple-500 rounded-xl text-sm text-gray-800 dark:text-white outline-none transition duration-300 focus:shadow-[0_0_15px_rgba(184,32,230,0.12)]"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={childVariants}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 mt-4 bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white rounded-xl font-semibold text-sm hover:opacity-95 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none shadow-[0_4px_15px_rgba(184,32,230,0.25)]"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                        Verifying...
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </motion.button>
                        </motion.div>
                    </form>

                    {/* Back to Home Link */}
                    <motion.div variants={childVariants} className="text-center mt-8 pt-4 border-t border-gray-200 dark:border-white/5">
                        <button
                            onClick={() => navigate('/')}
                            className="text-xs text-gray-500 dark:text-white/40 hover:text-gray-800 dark:hover:text-white/80 transition duration-300 inline-flex items-center gap-1.5"
                        >
                            ← Return to main portfolio
                        </button>
                    </motion.div>
                </motion.div>
            </div>
            </div>
        </>
    );
}
