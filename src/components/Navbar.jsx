import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Magnetic from './Magnetic'

export default function Navbar() {
    const sideMenuRef = useRef();
    const navRef = useRef();
    const navLinkRef = useRef();

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const openMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(-16rem)';
    }
    const closeMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(16rem)';
    }
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navRef.current.classList.add('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
                if (navLinkRef.current) {
                    navLinkRef.current.classList.remove('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/30', "dark:bg-transparent");
                }
            } else {
                navRef.current.classList.remove('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
                if (navLinkRef.current) {
                    navLinkRef.current.classList.add('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/30', "dark:bg-transparent");
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // -------- light mode and dark mode -----------
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const navItems = [
        { label: 'Home', href: '#top' },
        { label: 'About me', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Services', href: '#services' },
        { label: 'My Work', href: '#work' },
        { label: 'Contact me', href: '#contact' }
    ];

    return (
        <>
            <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden">
                <img src="./assets/header-bg-color.png" alt="" className="w-full" />
            </div>

            <nav ref={navRef} className="w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300">

                <Magnetic range={0.25}>
                    <a href="#top" className="cursor-pointer block">
                        <span className="text-xl font-bold font-Ovo tracking-tight">
                            <span className="text-gray-800 dark:text-white">&lt;</span>
                            <span className="bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent">aman.dev</span>
                            <span className="text-gray-800 dark:text-white">/&gt;</span>
                        </span>
                    </a>
                </Magnetic>

                <ul ref={navLinkRef} className="relative hidden md:flex items-center gap-1.5 rounded-full px-6 py-2.5 bg-white shadow-sm bg-opacity-50 font-Ovo dark:border dark:border-white/30 dark:bg-transparent">
                    {navItems.map((item, idx) => (
                        <li
                            key={idx}
                            className="relative"
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a
                                className="relative z-10 px-4 py-1.5 rounded-full block text-sm text-gray-700 dark:text-white/80 transition-colors duration-300 hover:text-gray-900 dark:hover:text-white"
                                href={item.href}
                            >
                                {item.label}
                            </a>
                            {hoveredIndex === idx && (
                                <motion.span
                                    layoutId="navHover"
                                    className="absolute inset-0 bg-gray-100 dark:bg-white/10 rounded-full -z-0"
                                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                />
                            )}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-1">
                    <Magnetic range={0.4}>
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                            <img src="./assets/moon_icon.png" alt="" className="w-5 dark:hidden" />
                            <img src="./assets/sun_icon.png" alt="" className="w-5 hidden dark:block" />
                        </button>
                    </Magnetic>

                    <Magnetic range={0.25}>
                        <a href="#contact" className="hidden lg:flex items-center gap-3 px-8 py-2 border border-gray-300 hover:bg-slate-100/70 dark:hover:bg-darkHover rounded-full ml-4 font-Ovo dark:border-white/30 text-sm font-semibold transition">
                            Contact
                            <img src="./assets/arrow-icon.png" alt="" className="w-3 dark:hidden" />
                            <img src="./assets/arrow-icon-dark.png" alt="" className="w-3 hidden dark:block" />
                        </a>
                    </Magnetic>

                    <button className="block md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10" onClick={openMenu}>
                        <img src="./assets/menu-black.png" alt="" className="w-6 dark:hidden" />
                        <img src="./assets/menu-white.png" alt="" className="w-6 hidden dark:block" />
                    </button>

                </div>
                {/* -- ----- mobile menu ------  -- */}
                <ul ref={sideMenuRef} className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 font-Ovo dark:bg-darkHover dark:text-white">

                    <div className="absolute right-6 top-6" onClick={closeMenu}>
                        <img src="./assets/close-black.png" alt="" className="w-5 cursor-pointer dark:hidden" />
                        <img src="./assets/close-white.png" alt="" className="w-5 cursor-pointer hidden dark:block" />
                    </div>

                    {navItems.map((item, idx) => (
                        <li key={idx}>
                            <a href={item.href} onClick={closeMenu} className="block py-1 hover:text-[#b820e6] transition-colors">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}