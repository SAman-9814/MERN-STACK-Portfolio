import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portfolio from './components/Portfolio'

// Lazy load administrative components to optimize initial bundle size
const AdminLogin = lazy(() => import('./components/AdminLogin'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard'))

// Premium visual loader for Suspense fallback
const SuspenseLoader = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-rose-50/20 dark:bg-[#0c0018] text-[#b820e6] font-Outfit transition-colors duration-300">
    <div className="flex flex-col items-center gap-3 animate-pulse">
      <div className="w-10 h-10 rounded-full border-4 border-purple-500/10 border-t-[#b820e6] animate-spin" />
      <span className="text-xs uppercase tracking-widest text-[#b820e6] dark:text-purple-400 font-semibold font-Outfit">Loading Portal...</span>
    </div>
  </div>
);

export default function App() {
    useEffect(() => {
        // Initialize theme globally on load to support dark mode on all routes
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return (
        <Router>
            <Suspense fallback={<SuspenseLoader />}>
                <Routes>
                    <Route path="/" element={<Portfolio />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
            </Suspense>
        </Router>
    )
}