import { useState } from 'react'
import ScrollReveal3D from './ScrollReveal3D';
import WordReveal from './WordReveal';
import Magnetic from './Magnetic';

export default function Contact() {
    const [result, setResult] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    const showToast = (message, type) => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "6132cbdb-7d4d-4be0-9c65-74373306f9b1");

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        }).then((res) => res.json());

        if (res.success) {
            setResult("");
            event.target.reset();
            showToast("✅ Message sent successfully! I'll get back to you soon.", "success");
        } else {
            setResult("");
            showToast("❌ Something went wrong. Please try again.", "error");
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
                        ×
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

                    <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
                        <input type="text" placeholder="Enter your name" className="flex-1 px-3 py-2 focus:ring-2 focus:ring-[#b820e6]/40 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white dark:bg-darkHover/30 transition" required name="name" />
                        <input type="email" placeholder="Enter your email" className="flex-1 px-3 py-2 focus:ring-2 focus:ring-[#b820e6]/40 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white dark:bg-darkHover/30 transition" required name="email" />
                    </div>

                    <textarea rows="6" placeholder="Enter your message" className="w-full px-4 py-2 focus:ring-2 focus:ring-[#b820e6]/40 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white mb-6 dark:bg-darkHover/30 transition" required name="message"></textarea>

                    <div className="flex justify-center">
                        <Magnetic range={0.2}>
                            <button type='submit'
                                className="py-2.5 px-10 flex items-center gap-2 rounded-full text-white font-Ovo font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(184,32,230,0.5)]"
                                style={{ background: 'linear-gradient(to right, #b820e6, #da7d20)' }}
                            >
                                {result === "Sending...." ? "Sending..." : "Send Message"}
                                <img src="./assets/right-arrow-white.png" alt="" className="w-4" />
                            </button>
                        </Magnetic>
                    </div>
                </form>
            </ScrollReveal3D>
        </div>
    )
}