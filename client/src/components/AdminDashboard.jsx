import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Magnetic from './Magnetic';
import CustomCursor from './CustomCursor';

const compressImage = (file) => {
    return new Promise((resolve) => {
        if (!file.type.startsWith('image/') || file.size < 250 * 1024) {
            resolve(file);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                const MAX_WIDTH = 1200;
                const MAX_HEIGHT = 1200;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = Math.round((height * MAX_WIDTH) / width);
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width = Math.round((width * MAX_HEIGHT) / height);
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                                type: 'image/jpeg',
                                lastModified: Date.now()
                            });
                            resolve(compressedFile);
                        } else {
                            resolve(file);
                        }
                    },
                    'image/jpeg',
                    0.82
                );
            };
            img.onerror = () => resolve(file);
        };
        reader.onerror = () => resolve(file);
    });
};

export default function AdminDashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [isDark, setIsDark] = useState(false);
    
    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    
    // Custom Confirmation Dialog State
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);
    
    // Form States
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [techTags, setTechTags] = useState([]);
    const [techInput, setTechInput] = useState('');
    const [github, setGithub] = useState('');
    const [live, setLive] = useState('');
    const [image, setImage] = useState('');
    const [imageMode, setImageMode] = useState('upload'); // 'upload' | 'url'
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState('');
    const [dragActive, setDragActive] = useState(false);
    
    // Edit Mode State
    const [editingId, setEditingId] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showToast('File is too large. Max size is 5MB.', 'error');
                return;
            }
            setSelectedFile(file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const allowedTypes = /jpeg|jpg|png|gif|webp/;
            const fileExt = file.name.split('.').pop().toLowerCase();
            const extMatch = allowedTypes.test(fileExt);
            const mimeMatch = allowedTypes.test(file.type);
            if (!extMatch || !mimeMatch) {
                showToast('Only image files (jpg, jpeg, png, gif, webp) are allowed!', 'error');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                showToast('File is too large. Max size is 5MB.', 'error');
                return;
            }
            setSelectedFile(file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const navigate = useNavigate();

    // Setup page protection and load data
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }

        // Setup axios authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const verifyAndFetch = async () => {
            try {
                // Verify Token
                await axios.get('/api/auth/verify');
                
                // Fetch projects
                const response = await axios.get('/api/projects');
                setProjects(response.data);
            } catch (err) {
                console.error('Session verification or fetch failed:', err);
                localStorage.removeItem('adminToken');
                delete axios.defaults.headers.common['Authorization'];
                navigate('/admin/login');
            } finally {
                setLoading(false);
            }
        };

        verifyAndFetch();
        
        // Initial theme check
        setIsDark(document.documentElement.classList.contains('dark'));
    }, [navigate]);

    // Apply cursor exemption
    useEffect(() => {
        document.body.classList.add('admin-route');
        return () => {
            document.body.classList.remove('admin-route');
        };
    }, []);

    // Theme toggler
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        const darkActive = document.documentElement.classList.contains('dark');
        localStorage.theme = darkActive ? 'dark' : 'light';
        setIsDark(darkActive);
    };

    // Custom Toast Alert System
    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        delete axios.defaults.headers.common['Authorization'];
        showToast('Successfully signed out. Redirecting...', 'success');
        setTimeout(() => {
            navigate('/');
        }, 1200);
    };

    // Reset Form fields
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setTechTags([]);
        setTechInput('');
        setGithub('');
        setLive('');
        setImage('');
        setSelectedFile(null);
        setFilePreview('');
        setImageMode('upload');
        setDragActive(false);
        setEditingId(null);
    };

    // Handle tag additions via keyboard triggers (Enter / Comma)
    const handleTechKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tag = techInput.trim();
            if (tag && !techTags.includes(tag)) {
                setTechTags([...techTags, tag]);
            }
            setTechInput('');
        }
    };

    // Remove tech tag from stack list
    const removeTag = (tagToRemove) => {
        setTechTags(techTags.filter(tag => tag !== tagToRemove));
    };

    // Handle Create or Update submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);

        let finalImageUrl = image;

        // If upload mode is selected and there's a file, upload it first
        if (imageMode === 'upload' && selectedFile) {
            let fileToUpload = selectedFile;

            // Compress image if larger than 250KB
            if (selectedFile.size > 250 * 1024) {
                showToast('Optimizing image quality...', 'success');
                fileToUpload = await compressImage(selectedFile);
            }

            const formData = new FormData();
            formData.append('image', fileToUpload);

            try {
                const uploadRes = await axios.post('/api/uploads', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                finalImageUrl = uploadRes.data.url;
            } catch (err) {
                console.error('File upload error:', err);
                showToast(err.response?.data?.message || 'File upload failed.', 'error');
                setActionLoading(false);
                return;
            }
        }

        const projectData = {
            title,
            description,
            techStack: techTags,
            github,
            live,
            image: finalImageUrl
        };

        try {
            if (editingId) {
                // Update
                const response = await axios.put(`/api/projects/${editingId}`, projectData);
                setProjects(projects.map(p => p._id === editingId ? response.data : p));
                showToast('Project settings updated successfully!', 'success');
            } else {
                // Create
                const response = await axios.post('/api/projects', projectData);
                setProjects([response.data, ...projects]);
                showToast('Project added successfully to MongoDB database!', 'success');
            }
            resetForm();
        } catch (err) {
            console.error('Submission error:', err);
            showToast(err.response?.data?.message || 'Failed to save project. Ensure database is running.', 'error');
        } finally {
            setActionLoading(false);
        }
    };

    // Handle Edit Mode initiation
    const handleEdit = (project) => {
        setEditingId(project._id);
        setTitle(project.title);
        setDescription(project.description);
        setTechTags(project.techStack || []);
        setTechInput('');
        setGithub(project.github);
        setLive(project.live);
        setImage(project.image);
        
        // Dynamically toggle input mode based on previous image URL
        if (project.image && !project.image.startsWith('/api/uploads/')) {
            setImageMode('url');
        } else {
            setImageMode('upload');
        }
        setSelectedFile(null);
        setFilePreview('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle Delete confirmed action
    const handleDeleteConfirm = async () => {
        const id = deleteConfirmId;
        setDeleteConfirmId(null);
        if (!id) return;
        
        try {
            await axios.delete(`/api/projects/${id}`);
            setProjects(projects.filter(p => p._id !== id));
            showToast('Project permanently deleted from DB!', 'success');
            if (editingId === id) resetForm();
        } catch (err) {
            console.error('Deletion error:', err);
            showToast(err.response?.data?.message || 'Failed to delete project.', 'error');
        }
    };

    // Normalize slashes for local assets
    const cleanImagePath = (img) => {
        if (!img) return '';
        if (img.startsWith('blob:')) return img;
        let normalized = img.replace(/\\/g, '/');
        if (normalized.startsWith('./assets/')) {
            return normalized.replace('./assets/', '/assets/');
        }
        if (normalized.startsWith('assets/')) {
            return '/' + normalized;
        }
        return normalized;
    };

    // Derived Statistics
    const totalProjects = projects.length;
    const uniqueTech = [...new Set(projects.flatMap(p => p.techStack || []))].length;
    const latestProjectName = projects.length > 0 ? projects[0].title : 'None';

    // Live Preview / Latest Upload state falls back to latest project in list
    const latestProject = projects[0] || {};
    const previewTitle = title || latestProject.title || 'My Project Title';
    const previewDescription = description || latestProject.description || 'This description box dynamically renders key specs, database interactions, and animations as you write them.';
    const previewImage = (imageMode === 'upload' && filePreview) ? filePreview : (image || latestProject.image || '');

    let previewTech = ['React', 'Tailwind'];
    if (techTags.length > 0) {
        previewTech = techTags;
    } else if (latestProject.techStack && latestProject.techStack.length > 0) {
        previewTech = latestProject.techStack;
    }

    // Filter projects based on Search Input
    const filteredProjects = projects.filter((project) => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesTech = project.techStack.some((tech) => tech.toLowerCase().includes(query));
        return matchesTitle || matchesTech;
    });

    if (loading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-rose-50/30 dark:bg-darkTheme font-Ovo transition-colors duration-300">
                <div className="w-12 h-12 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin mb-4" />
                <p className="text-gray-600 dark:text-white/60 text-sm tracking-widest font-Outfit animate-pulse">VERIFYING ADMIN CONSOLE...</p>
            </div>
        );
    }    // Framer Motion Variants for Staggered Stats Load
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                type: "spring", 
                stiffness: 120,
                damping: 14
            } 
        }
    };

    return (
        <>
            <CustomCursor />
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

            {/* Custom Premium Deletion Confirmation Modal */}
            <AnimatePresence>
                {deleteConfirmId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setDeleteConfirmId(null)}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#11001f]/35 dark:bg-black/60 backdrop-blur-md px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 15, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 15, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-sm bg-white dark:bg-[#11001F]/90 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden font-Ovo text-center"
                        >
                            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            </div>
                            <h3 className="text-lg font-bold font-Outfit text-gray-800 dark:text-white">Delete Portfolio Project?</h3>
                            <p className="text-xs text-gray-500 dark:text-white/60 mt-2 leading-relaxed">
                                Are you sure you want to permanently delete this project? This action cannot be undone and will modify the live website content.
                            </p>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="flex-1 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/15 text-slate-700 dark:text-white/80 rounded-lg text-xs font-semibold hover:bg-gray-200 dark:hover:bg-white/10 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold active:scale-[0.98] transition-all shadow-md shadow-red-500/10"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="min-h-screen w-full bg-rose-50/30 dark:bg-darkTheme text-gray-800 dark:text-white font-Ovo relative pb-12 transition-colors duration-300">
                {/* Background ambient lights */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/5 dark:bg-purple-900/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#da7d20]/5 dark:bg-orange-950/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

                {/* Navbar */}
                <header className="sticky top-0 bg-white/80 dark:bg-[#11001F]/80 border-b border-gray-200 dark:border-white/5 backdrop-blur-md z-40 px-6 py-4 flex justify-between items-center transition-colors duration-300 shadow-sm">
                    <div className="flex items-center gap-4">
                        <span className="text-xl font-bold tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                            <span className="text-gray-800/50 dark:text-white/50">&lt;</span>
                            <span className="bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent">aman.dev</span>
                            <span className="text-gray-800/50 dark:text-white/50">/&gt;</span>
                        </span>
                        <span className="h-4 w-px bg-gray-300 dark:bg-white/20 hidden sm:block" />
                        <span className="text-[10px] uppercase font-Outfit tracking-widest text-[#b820e6] dark:text-purple-400 font-semibold bg-[#b820e6]/10 px-2.5 py-1 rounded-full hidden sm:block">Admin</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Magnetic range={0.4}>
                            <button 
                                onClick={toggleTheme} 
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                            >
                                <img src={isDark ? "/assets/sun_icon.png" : "/assets/moon_icon.png"} alt="" className="w-5" />
                            </button>
                        </Magnetic>

                        <button
                            onClick={() => navigate('/')}
                            className="text-sm text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition font-medium mr-2"
                        >
                            View Portfolio
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 border border-red-500/20 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-full text-xs font-semibold hover:bg-red-500 hover:text-white transition duration-300 shadow-sm"
                        >
                            Sign Out
                        </button>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
                    {/* Dashboard Stats Panel */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
                    >
                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ y: -6, scale: 1.015, boxShadow: "0 12px 30px -10px rgba(184,32,230,0.12)" }}
                            className="bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:border-[#b820e6]/40 dark:hover:border-[#b820e6]/40 transition-all duration-300 cursor-default"
                        >
                            <div className="p-3.5 rounded-xl bg-purple-500/10 text-[#b820e6]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-white/50 uppercase tracking-widest font-Outfit">Total Projects</p>
                                <h3 className="text-2xl font-bold font-Outfit mt-1 text-gray-800 dark:text-white">{totalProjects} items</h3>
                            </div>
                        </motion.div>
                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ y: -6, scale: 1.015, boxShadow: "0 12px 30px -10px rgba(218,125,32,0.12)" }}
                            className="bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:border-[#da7d20]/40 dark:hover:border-[#da7d20]/40 transition-all duration-300 cursor-default"
                        >
                            <div className="p-3.5 rounded-xl bg-orange-500/10 text-[#da7d20]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-white/50 uppercase tracking-widest font-Outfit">Unique Technologies</p>
                                <h3 className="text-2xl font-bold font-Outfit mt-1 text-gray-800 dark:text-white">{uniqueTech} tags</h3>
                            </div>
                        </motion.div>
                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ y: -6, scale: 1.015, boxShadow: "0 12px 30px -10px rgba(168,85,247,0.12)" }}
                            className="bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:border-purple-500/40 dark:hover:border-purple-500/40 transition-all duration-300 cursor-default"
                        >
                            <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-white/50 uppercase tracking-widest font-Outfit">Latest Addition</p>
                                <h3 className="text-base font-bold font-Outfit mt-1 text-gray-800 dark:text-white truncate max-w-[200px]" title={latestProjectName}>{latestProjectName}</h3>
                            </div>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Form Column */}
                        <motion.div 
                            initial={{ opacity: 0, x: -25 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.15 }}
                            className="lg:col-span-5 flex flex-col gap-8 min-w-0"
                        >
                            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-md transition-colors duration-300">
                                <h2 className="text-xl font-semibold font-Outfit mb-6 text-[#b820e6] dark:text-purple-400">
                                    {editingId ? '⚡ Edit Project Settings' : '✨ Add New Project'}
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-white/50 mb-1.5 font-semibold">Project Title</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-[#11001F]/50 border border-gray-300 dark:border-white/10 rounded-lg text-sm outline-none focus:border-[#b820e6] dark:focus:border-purple-500 text-gray-800 dark:text-white transition"
                                                placeholder="e.g. Full Stack AI Fitness App"
                                                required
                                            />
                                            <span className="absolute right-3.5 top-3 text-gray-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-white/50 mb-1.5 font-semibold">Description</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows="3"
                                            className="w-full px-4 py-2.5 bg-white dark:bg-[#11001F]/50 border border-gray-300 dark:border-white/10 rounded-lg text-sm outline-none focus:border-[#b820e6] dark:focus:border-purple-500 text-gray-800 dark:text-white transition resize-none"
                                            placeholder="Describe the key stack, core logic, and features..."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-white/50 mb-1.5 font-semibold">Tech Stack (Tags)</label>
                                        <div className="flex flex-wrap gap-1.5 p-2 bg-white dark:bg-[#11001F]/50 border border-gray-300 dark:border-white/10 rounded-lg focus-within:border-[#b820e6] dark:focus-within:border-purple-500 min-h-[44px]">
                                            {techTags.map((tag, idx) => (
                                                <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#b820e6]/10 text-[#b820e6] dark:text-purple-300 rounded text-xs font-semibold">
                                                    {tag}
                                                    <button type="button" onClick={() => removeTag(tag)} className="text-[10px] text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition">✕</button>
                                                </span>
                                            ))}
                                            <input
                                                type="text"
                                                value={techInput}
                                                onChange={(e) => setTechInput(e.target.value)}
                                                onKeyDown={handleTechKeyDown}
                                                className="flex-grow bg-transparent text-sm text-gray-800 dark:text-white outline-none border-none p-0.5 min-w-[120px]"
                                                placeholder={techTags.length === 0 ? "Type tech and hit Enter/Comma" : "Add tech..."}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-white/50 mb-1.5 font-semibold">GitHub Link</label>
                                            <input
                                                type="text"
                                                value={github}
                                                onChange={(e) => setGithub(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white dark:bg-[#11001F]/50 border border-gray-300 dark:border-white/10 rounded-lg text-sm outline-none focus:border-[#b820e6] dark:focus:border-purple-500 text-gray-800 dark:text-white transition"
                                                placeholder="https://github.com/..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-white/50 mb-1.5 font-semibold">Live Demo Link</label>
                                            <input
                                                type="text"
                                                value={live}
                                                onChange={(e) => setLive(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white dark:bg-[#11001F]/50 border border-gray-300 dark:border-white/10 rounded-lg text-sm outline-none focus:border-[#b820e6] dark:focus:border-purple-500 text-gray-800 dark:text-white transition"
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-white/50 font-semibold">Project Image</label>
                                            <div className="flex bg-gray-100 dark:bg-white/5 rounded-full p-0.5 text-[9px] font-Outfit">
                                                <button
                                                    type="button"
                                                    onClick={() => setImageMode('upload')}
                                                    className={`px-3 py-1 rounded-full transition-all duration-200 ${imageMode === 'upload' ? 'bg-[#b820e6] text-white shadow-sm' : 'text-gray-500 dark:text-white/50 hover:text-gray-800 dark:hover:text-white'}`}
                                                >
                                                    Upload File
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setImageMode('url')}
                                                    className={`px-3 py-1 rounded-full transition-all duration-200 ${imageMode === 'url' ? 'bg-[#b820e6] text-white shadow-sm' : 'text-gray-500 dark:text-white/50 hover:text-gray-800 dark:hover:text-white'}`}
                                                >
                                                    Custom URL
                                                </button>
                                            </div>
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {imageMode === 'upload' ? (
                                                <motion.div
                                                    key="upload"
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="space-y-2"
                                                >
                                                    <motion.label 
                                                        onDragEnter={handleDrag}
                                                        onDragOver={handleDrag}
                                                        onDragLeave={handleDrag}
                                                        onDrop={handleDrop}
                                                        animate={{
                                                            scale: dragActive ? 1.035 : 1,
                                                            borderColor: dragActive ? '#b820e6' : '',
                                                            boxShadow: dragActive ? '0 8px 24px -6px rgba(184,32,230,0.15)' : 'none'
                                                        }}
                                                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                                                        className={`relative flex flex-col items-center justify-center w-full min-h-[110px] border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 p-4 text-center ${
                                                            dragActive 
                                                                ? 'border-[#b820e6] bg-[#b820e6]/5' 
                                                                : 'border-gray-300 dark:border-white/10 hover:border-[#b820e6] dark:hover:border-purple-500 bg-white dark:bg-[#11001F]/50'
                                                        }`}
                                                    >
                                                        <input 
                                                            type="file" 
                                                            onChange={handleFileChange}
                                                            accept="image/*"
                                                            className="hidden" 
                                                        />
                                                        
                                                        {filePreview ? (
                                                            <div className="flex items-center gap-3 w-full text-left">
                                                                <img src={filePreview} alt="Selected preview" className="w-14 h-14 object-cover rounded-lg border border-gray-200 dark:border-white/10 shrink-0" />
                                                                <div className="flex-grow overflow-hidden">
                                                                    <p className="text-xs text-gray-800 dark:text-white font-medium truncate">{selectedFile?.name}</p>
                                                                    <p className="text-[10px] text-gray-500 dark:text-white/40 mt-0.5">{(selectedFile?.size / 1024).toFixed(0)} KB</p>
                                                                </div>
                                                                <button 
                                                                    type="button" 
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        setSelectedFile(null);
                                                                        setFilePreview('');
                                                                    }} 
                                                                    className="p-1.5 bg-gray-100 hover:bg-red-500 hover:text-white dark:bg-white/10 dark:hover:bg-red-500 rounded-full transition-colors text-gray-400"
                                                                    title="Remove selected file"
                                                                >
                                                                    ✕
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                                <span className="text-xs text-gray-600 dark:text-white/80 font-medium">Click to upload or drag & drop</span>
                                                                <span className="text-[9px] text-gray-500 dark:text-white/40 mt-1">PNG, JPG, JPEG, WEBP or GIF (max. 5MB)</span>
                                                            </>
                                                        )}
                                                    </motion.label>
                                                    {editingId && !selectedFile && image && (
                                                        <div className="flex items-center gap-2 p-2 bg-purple-500/5 border border-purple-500/10 rounded-lg text-[10px] text-purple-600 dark:text-purple-400 font-medium">
                                                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                            <span>Active stored image: <code className="bg-[#11001F]/10 dark:bg-white/15 px-1 py-0.5 rounded truncate max-w-[150px] inline-block align-middle">{image}</code> (upload new to replace)</span>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="url"
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="relative"
                                                >
                                                    <input
                                                        type="text"
                                                        value={image}
                                                        onChange={(e) => setImage(e.target.value)}
                                                        className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-[#11001F]/50 border border-gray-300 dark:border-white/10 rounded-lg text-sm outline-none focus:border-[#b820e6] dark:focus:border-purple-500 text-gray-800 dark:text-white transition"
                                                        placeholder="e.g. /assets/work-1.png or web link"
                                                    />
                                                    <span className="absolute right-3.5 top-3 text-gray-400">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    </span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <motion.button
                                            whileHover={{ scale: 1.015 }}
                                            whileTap={{ scale: 0.985 }}
                                            type="submit"
                                            disabled={actionLoading}
                                            className="flex-1 py-3 bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white rounded-lg text-xs font-semibold hover:opacity-95 disabled:opacity-50 disabled:pointer-events-none shadow-[0_4px_12px_rgba(184,32,230,0.2)]"
                                        >
                                            {actionLoading ? 'Saving changes...' : editingId ? 'Update Project' : 'Create Project'}
                                        </motion.button>
                                        {editingId && (
                                            <motion.button
                                                whileHover={{ scale: 1.015 }}
                                                whileTap={{ scale: 0.985 }}
                                                type="button"
                                                onClick={resetForm}
                                                className="px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/15 text-slate-700 dark:text-white/80 rounded-lg text-xs font-semibold hover:bg-gray-200 dark:hover:bg-white/10 transition"
                                            >
                                                Cancel
                                            </motion.button>
                                        )}
                                    </div>
                                </form>
                            </div>

                             <motion.div 
                                 initial={{ opacity: 0, y: 15 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ type: "spring", stiffness: 100, delay: 0.35 }}
                                 className="bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm"
                             >
                                 <h3 className="text-xs uppercase tracking-widest text-[#da7d20] font-bold mb-4 font-Outfit">⚡ Latest Project Upload (Live Preview)</h3>
                                 
                                 <motion.div 
                                     whileHover={{ y: -6, scale: 1.025 }}
                                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                     className="max-w-[280px] mx-auto border border-gray-200 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 shadow-md overflow-hidden"
                                 >
                                    <div 
                                        className="w-full h-36 bg-cover bg-center border-b border-gray-200 dark:border-white/10 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs text-gray-400"
                                        style={{ backgroundImage: `url('${cleanImagePath(previewImage) || '/assets/work-1.png'}')` }}
                                    >
                                        {!previewImage && 'No Image Stored / Inputted'}
                                    </div>
                                    <div className="p-5 flex flex-col min-h-[180px]">
                                        <h4 className="text-base font-semibold text-gray-800 dark:text-white mb-2 truncate">
                                            {previewTitle}
                                        </h4>
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {previewTech.map((tech, i) => (
                                                <span key={i} className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/80 rounded text-[9px] font-medium whitespace-nowrap">
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-[11px] text-gray-500 dark:text-white/60 leading-normal line-clamp-3 mb-4 flex-grow">
                                            {previewDescription}
                                        </p>
                                        <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-white/10 text-[10px] text-center">
                                            <a href={github || latestProject.github || '#'} target="_blank" rel="noreferrer" className="flex-1 py-1 border border-gray-200 dark:border-white/20 rounded-full text-gray-500 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/5 transition">GitHub</a>
                                            <a href={live || latestProject.live || '#'} target="_blank" rel="noreferrer" className="flex-1 py-1 bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white rounded-full font-medium hover:opacity-90 transition">Demo</a>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Listing Column */}
                        <motion.div 
                            initial={{ opacity: 0, x: 25 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.25 }}
                            className="lg:col-span-7 min-w-0"
                        >
                            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-md transition-colors duration-300">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                    <h2 className="text-xl font-semibold font-Outfit text-[#da7d20] dark:text-orange-400">
                                        📂 Active Database Projects ({totalProjects})
                                    </h2>
                                    
                                    {/* Real-Time Search Bar */}
                                    <div className="relative max-w-xs w-full">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-[#11001F]/50 border border-gray-300 dark:border-white/10 focus:border-[#b820e6] dark:focus:border-purple-500 rounded-full text-xs text-gray-800 dark:text-white outline-none transition"
                                            placeholder="Search by title or tech..."
                                        />
                                        <span className="absolute left-3.5 top-2.5 text-gray-400">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </span>
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery('')}
                                                className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-white text-xs"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {filteredProjects.length === 0 ? (
                                    <div className="text-center py-20 text-gray-500 dark:text-white/40 border border-dashed border-gray-300 dark:border-white/10 rounded-xl">
                                        <p className="text-sm">
                                            {searchQuery ? 'No matching projects found.' : 'No projects currently saved in the database.'}
                                        </p>
                                        <p className="text-xs mt-1">
                                            {searchQuery ? 'Try another keyword or tag.' : 'Use the form on the left to create one.'}
                                        </p>
                                    </div>
                                ) : (
                                    <motion.div layout className="space-y-4">
                                        <AnimatePresence mode="popLayout">
                                            {filteredProjects.map((project) => (
                                                <motion.div
                                                    key={project._id}
                                                    layout
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    whileHover={{ x: 6, boxShadow: "0 6px 20px rgba(0,0,0,0.03)" }}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-gray-200/60 dark:border-white/5 bg-gray-50 dark:bg-[#11001F]/30 hover:bg-[#fcf4ff] dark:hover:bg-[#11001F]/60 transition-all duration-300"
                                                >
                                                    {/* Preview image */}
                                                    <div
                                                        className="w-full sm:w-28 h-20 bg-cover bg-center rounded-lg border border-gray-200 dark:border-white/10 shrink-0 bg-gray-200 dark:bg-slate-800"
                                                        style={{ backgroundImage: `url('${cleanImagePath(project.image) || '/assets/work-1.png'}')` }}
                                                    />

                                                    <div className="flex-grow flex flex-col justify-between">
                                                        <div>
                                                            <h3 className="font-semibold text-gray-800 dark:text-white text-base tracking-wide">{project.title}</h3>
                                                            <p className="text-xs text-gray-600 dark:text-white/60 mt-1 line-clamp-2 leading-relaxed">{project.description}</p>
                                                            <div className="flex flex-wrap gap-1 mt-2">
                                                                {project.techStack.map((tech, i) => (
                                                                    <span key={i} className="px-1.5 py-0.5 bg-gray-200/80 dark:bg-white/10 text-slate-700 dark:text-white/80 rounded text-[9px] font-medium">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-4 mt-4 pt-3 border-t border-gray-200/50 dark:border-white/5 justify-end">
                                                            <button
                                                                onClick={() => handleEdit(project)}
                                                                className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold transition"
                                                            >
                                                                Edit Project
                                                            </button>
                                                            <button
                                                                onClick={() => setDeleteConfirmId(project._id)}
                                                                className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-semibold transition"
                                                            >
                                                                Delete Project
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </>
    );
}
