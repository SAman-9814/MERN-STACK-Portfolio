import { useState } from 'react'
import ScrollReveal3D from './ScrollReveal3D';
import WordReveal from './WordReveal';
import Magnetic from './Magnetic';

export default function Contact() {
    const [result, setResult] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", type: "" });
    const [messageLength, setMessageLength] = useState(0);

    const showToast = (message, type) => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message })
            }).then((res) => res.json());

            if (res.success) {
                setResult("");
                event.target.reset();
                setMessageLength(0);
                showToast("✅ Message sent successfully! I'll get back to you soon.", "success");
            } else {
                setResult("");
                showToast(`❌ ${res.message || "Something went wrong. Please try again."}`, "error");
            }
        } catch (error) {
            console.error("Contact send error:", error);
            setResult("");
            showToast("❌ Connection error. Please try again later.", "error");
        }
    };

    return (
        <div id="contact" className="w-full px-[12%] py-10 scroll-mt-20 bg-[url('./assets/footer-bg-color.png')] bg-no-repeat bg-[length:90%_auto] bg-center dark:bg-none overflow-hidden">

            {/* Toast Notification */}
            {toast.show && (
                <div
                    className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white text-sm font-Ovo max-w-sm transition-all duration-500 animate-slide-in
                        ${toast.type === 'success'
                            ? 'bg-gradient-to-r from-[#7c3aed] to-[#b820e6]'
                            : 'bg-gradient-to-r from-[#da7d20] to-[#f43f5e]'
                        }`}
                >
                    <span className="text-lg">{toast.type === 'success' ? '🎉' : '⚠️'}</span>
                    <div className="flex-1">
                        <p className="font-semibold">{toast.type === 'success' ? 'Message Sent!' : 'Error'}</p>
                        <p className="text-white/80 text-xs mt-0.5">{toast.message.replace('✅ ', '').replace('❌ ', '')}</p>
                    </div>
                    <button
                        onClick={() => setToast({ show: false, message: "", type: "" })}
                        className="ml-2 text-white/70 hover:text-white text-lg leading-none"
                    >
                        &times;
                    </button>
                </div>
            )}

            {/* Animated header */}
            <ScrollReveal3D>
                <div className="text-center mb-12 relative flex flex-col items-center">
                    {/* Decorative top badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-300 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#b820e6] animate-pulse" />
                        <span className="text-xs font-semibold text-[#b820e6] font-Ovo tracking-widest uppercase">Connect with me</span>
                    </div>

                    {/* Main heading with gradient shimmer */}
                    <h2 className="text-5xl font-Ovo font-bold mb-4 shimmer-text flex justify-center">
                        <WordReveal text="Get in touch" className="justify-center" />
                    </h2>

                    {/* Animated underline */}
                    <div className="flex items-center justify-center gap-2 mb-5">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#b820e6]" />
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] animate-bounce" />
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#da7d20]" />
                    </div>

                    <p className="max-w-2xl mx-auto font-Ovo text-gray-500 dark:text-white/60">
                        I&apos;d love to hear from you! If you have any questions, comments or feedback, please use the form below.
                    </p>
                </div>
            </ScrollReveal3D>

            <ScrollReveal3D delay={0.2}>
                <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
                    <input type="hidden" name="subject" value="Aman Sah - New form Submission" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-8">
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </span>
                            <input type="text" placeholder="Enter your name" className="w-full pl-11 pr-4 py-3 focus:ring-2 focus:ring-[#b820e6]/40 focus:border-[#b820e6] outline-none border border-gray-300 dark:border-white/30 rounded-xl bg-white dark:bg-darkHover/30 transition text-sm text-gray-800 dark:text-white" required name="name" />
                        </div>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </span>
                            <input type="email" placeholder="Enter your email" className="w-full pl-11 pr-4 py-3 focus:ring-2 focus:ring-[#b820e6]/40 focus:border-[#b820e6] outline-none border border-gray-300 dark:border-white/30 rounded-xl bg-white dark:bg-darkHover/30 transition text-sm text-gray-800 dark:text-white" required name="email" />
                        </div>
                    </div>

                    <div className="relative w-full mb-6">
                        <span className="absolute left-3.5 top-3.5 text-gray-400 dark:text-white/40">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                        </span>
                        <textarea rows="6" placeholder="Enter your message" className="w-full pl-11 pr-4 py-3 focus:ring-2 focus:ring-[#b820e6]/40 focus:border-[#b820e6] outline-none border border-gray-300 dark:border-white/30 rounded-xl bg-white dark:bg-darkHover/30 transition text-sm text-gray-800 dark:text-white resize-none" required name="message" maxLength="1000" onChange={(e) => setMessageLength(e.target.value.length)}></textarea>
                        <span className="absolute right-3.5 bottom-2.5 text-[10px] text-gray-400 dark:text-white/40 font-mono">
                            {messageLength} / 1000
                        </span>
                    </div>

                    <div className="flex justify-center">
                        <Magnetic range={0.2}>
                            <button type='submit'
                                disabled={result === "Sending...."}
                                className={`py-2.5 px-10 flex items-center gap-2 rounded-full text-white font-Ovo font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(184,32,230,0.5)] ${result === "Sending...." ? 'opacity-70 cursor-not-allowed' : ''}`}
                                style={{ background: 'linear-gradient(to right, #b820e6, #da7d20)' }}
                            >
                                {result === "Sending...." ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <img src="./assets/right-arrow-white.png" alt="" className="w-4" />
                                    </>
                                )}
                            </button>
                        </Magnetic>
                    </div>
                </form>
            </ScrollReveal3D>
        </div>
    )
}