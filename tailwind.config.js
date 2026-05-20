/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
            },
            fontFamily: {
                Outfit: ["Outfit", "sans-serif"],
                Ovo: ["Ovo", "serif"]
            },
            animation: {
                spin_slow: 'spin 6s linear infinite',
                wave: 'wave 1.8s ease-in-out infinite',
            },
            keyframes: {
                wave: {
                    '0%':   { transform: 'rotate(0deg)' },
                    '15%':  { transform: 'rotate(18deg)' },
                    '30%':  { transform: 'rotate(-10deg)' },
                    '45%':  { transform: 'rotate(18deg)' },
                    '60%':  { transform: 'rotate(-5deg)' },
                    '75%':  { transform: 'rotate(12deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                },
            },
            colors: {
                lightHover: '#fcf4ff',
                darkHover: '#2a004a',
                darkTheme: '#11001F'
            },
            boxShadow: {
                'black': '4px 4px 0 #000',
                'white': '4px 4px 0 #fff',
            }
        },
    },
    darkMode: 'selector',
    plugins: [],
}