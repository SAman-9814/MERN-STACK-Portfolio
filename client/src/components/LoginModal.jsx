import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function LoginModal({ isOpen, onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toasts, setToasts] = useState([]);
    const navigate = useNavigate();

    // Helper to trigger custom toasts
    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/api/auth/login', { username, password });
            localStorage.setItem('adminToken', response.data.token);
            
            showToast('Access Granted! Redirecting to Control Panel...', 'success');
            
            setTimeout(() => {
                onClose();
                navigate('/admin/dashboard');
            }, 1200);
        } catch (err) {
            console.error('Login error:', err);
            showToast(err.response?.data?.message || 'Access Denied: Invalid credentials', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Custom Floating Toasts Portal */}
            <div className="fixed bottom-5 right-5 z-[10000] flex flex-col gap-3 max-w-sm pointer-events-none">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 50, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                            className={`flex items-center gap-3 p-4 rounded-xl backdrop-blur-md shadow-lg pointer-events-auto border min-w-[280px] font-Outfit ${
                                t.type === 'success'
                                    ? 'bg-emerald-50/90 dark:bg-emerald-950/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-red-50/90 dark:bg-red-950/10 border-red-500/30 text-red-600 dark:text-red-400'
                            }`}
                        >
                            {t.type === 'success' ? (
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            ) : (
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            )}
                            <span className="text-xs font-semibold flex-grow leading-normal">{t.message}</span>
                            <button
                                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-sm"
                            >
                                ✕
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#11001f]/35 dark:bg-black/60 backdrop-blur-md px-4"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-md bg-white/95 dark:bg-[#11001F]/90 border border-gray-200/80 dark:border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden font-Ovo text-gray-800 dark:text-white"
                >
                    {/* Accent lighting orbs inside the modal card */}
                    <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] bg-[#b820e6]/10 rounded-full blur-[60px] pointer-events-none" />
                    <div className="absolute bottom-[-30%] right-[-20%] w-[60%] h-[60%] bg-[#da7d20]/10 rounded-full blur-[60px] pointer-events-none" />

                    {/* Top dynamic lighting bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#b820e6] to-[#da7d20]" />

                    {/* Close Button with spin animation */}
                    <motion.button
                        whileHover={{ rotate: 90, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-500 dark:text-white/70 hover:text-gray-800 dark:hover:text-white transition duration-200 z-10"
                        aria-label="Close modal"
                    >
                        ✕
                    </motion.button>

                    {/* Header */}
                    <div className="text-center mb-7 pt-4 relative">
                        <span className="text-2xl font-bold tracking-tight">
                            <span className="text-gray-800/60 dark:text-white/60">&lt;</span>
                            <span className="bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent font-Outfit">aman.dev</span>
                            <span className="text-gray-800/60 dark:text-white/60">/&gt;</span>
                        </span>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-4 tracking-wide font-Outfit">Admin Access Portal</h2>
                        <p className="text-xs text-gray-500 dark:text-white/50 mt-1">Provide secure credentials to enter the workspace.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 relative">
                        <div>
                            <label className="block text-[10px] font-semibold text-gray-500 dark:text-white/60 uppercase tracking-widest mb-1.5" htmlFor="modal-username">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    id="modal-username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#11001F]/50 border border-gray-300 dark:border-white/10 focus:border-[#b820e6] dark:focus:border-[#b820e6] rounded-xl text-sm text-gray-800 dark:text-white outline-none transition duration-300"
                                    placeholder="Enter admin username"
                                    required
                                />
                                <span className="absolute left-3.5 top-3.5 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-semibold text-gray-500 dark:text-white/60 uppercase tracking-widest mb-1.5" htmlFor="modal-password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="modal-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 bg-white dark:bg-[#11001F]/50 border border-gray-300 dark:border-white/10 focus:border-[#b820e6] dark:focus:border-[#b820e6] rounded-xl text-sm text-gray-800 dark:text-white outline-none transition duration-300"
                                    placeholder="••••••••"
                                    required
                                />
                                {/* Input Lock Icon */}
                                <span className="absolute left-3.5 top-3.5 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                </span>
                                {/* Password Toggle Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-[#b820e6] dark:hover:text-purple-400 transition"
                                    tabIndex="-1"
                                >
                                    {showPassword ? (
                                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0A10.47 10.47 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                                    ) : (
                                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white rounded-xl font-semibold text-sm hover:opacity-95 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none shadow-[0_4px_12px_rgba(184,32,230,0.2)] mt-6"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    Verifying Access...
                                </span>
                            ) : (
                                'Sign In to Dashboard'
                            )}
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </>
    );
}
