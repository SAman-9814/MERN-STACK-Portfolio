import Magnetic from './Magnetic';

export default function Footer() {
    return (
        <div className="mt-20">
            <div className="text-center">
                <Magnetic range={0.2}>
                    <a href="#top" className="inline-block mb-4">
                        <span className="text-2xl font-bold font-Ovo tracking-tight">
                            <span className="text-gray-800 dark:text-white">&lt;</span>
                            <span className="bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent">aman.dev</span>
                            <span className="text-gray-800 dark:text-white">/&gt;</span>
                        </span>
                    </a>
                </Magnetic>

                <div className="flex justify-center mt-3">
                    <Magnetic range={0.15}>
                        <a href="mailto:sah99017@gmail.com"
                            className="group w-max flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-300 hover:scale-105"
                            style={{
                                border: '1px solid rgba(184,32,230,0.35)',
                                background: 'linear-gradient(135deg, rgba(184,32,230,0.07), rgba(218,125,32,0.07))',
                                boxShadow: '0 2px 16px rgba(184,32,230,0.08)'
                            }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(184,32,230,0.3)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 16px rgba(184,32,230,0.08)'}
                        >
                            {/* Pulsing dot */}
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: '#b820e6' }} />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: 'linear-gradient(135deg, #b820e6, #da7d20)' }} />
                            </span>
                            <img src="./assets/mail_icon.png" alt="" className="w-4 dark:hidden" />
                            <img src="./assets/mail_icon_dark.png" alt="" className="w-4 hidden dark:block" />
                            <span className="text-sm font-Ovo bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent font-semibold">
                                sah99017@gmail.com
                            </span>
                            {/* Arrow */}
                            <span className="text-[#da7d20] text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                    </Magnetic>
                </div>
            </div>
            <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-3">
                <p className="font-Ovo text-sm text-gray-500 dark:text-white/60">© {new Date().getFullYear()} Aman Sah. All rights reserved.</p>
                <ul className="flex items-center gap-6 sm:gap-10 justify-center mt-4 sm:mt-0 font-Ovo text-sm flex-wrap">
                    <li>
                        <Magnetic range={0.2}>
                            <a target='_blank' href="https://github.com/SAman-9814" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gray-500 dark:hover:text-gray-300 transition text-gray-700 dark:text-white/80">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                                GitHub
                            </a>
                        </Magnetic>
                    </li>
                    <li>
                        <Magnetic range={0.2}>
                            <a target='_blank' href="https://linkedin.com/in/aman-sah9814" rel="noreferrer" className="flex items-center gap-1.5 text-[#0077B5] hover:text-[#005fa3] transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                LinkedIn
                            </a>
                        </Magnetic>
                    </li>
                    <li>
                        <Magnetic range={0.2}>
                            <a target='_blank' href="https://wa.me/9779814834383" rel="noreferrer" className="flex items-center gap-1.5 text-[#25D366] hover:text-[#20ba57] transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                WhatsApp
                            </a>
                        </Magnetic>
                    </li>
                    <li>
                        <Magnetic range={0.2}>
                            <a target='_blank' href="https://www.facebook.com/aaryan.shah" rel="noreferrer" className="flex items-center gap-1.5 text-[#1877F2] hover:text-[#0f54bd] transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                                Facebook
                            </a>
                        </Magnetic>
                    </li>
                    <li>
                        <Magnetic range={0.2}>
                            <a target='_blank' href="https://www.instagram.com/aman_sah_9814" rel="noreferrer" className="flex items-center gap-1.5 text-[#E1306C] hover:text-[#b01e4e] transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                Instagram
                            </a>
                        </Magnetic>
                    </li>
                </ul>
            </div>
        </div>
    )
}