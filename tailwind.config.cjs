/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
    mode: "jit",
    theme: {
        extend: {
            colors: {
                primary: "#050816",
                secondary: "#aaa6c3",
                tertiary: "#151030",
                "black-100": "#100d25",
                "black-200": "#090325",
                "white-100": "#f3f3f3",
                // Deep space surfaces
                space: {
                    900: "#02030A",
                    800: "#070A18",
                    700: "#0E1228",
                },
                // Soft pastel accents (muted, readable on dark)
                accent: {
                    lavender: "#C9B8FF",
                    sky: "#9FD4FF",
                    mint: "#A9E8D0",
                    rose: "#F3C0E0",
                    peri: "#A9B4FF",
                },
            },
            fontFamily: {
                display: ['"Bebas Neue"', "sans-serif"],
                mono: ['"Roboto Mono"', "ui-monospace", "monospace"],
                body: ['"Roboto Mono"', "ui-monospace", "monospace"],
            },
            boxShadow: {
                card: "0px 35px 120px -15px #211e35",
                soft: "0 18px 50px -20px rgba(0, 0, 0, 0.7)",
                glow: "0 0 28px -8px rgba(201, 184, 255, 0.45)",
                "glow-sky": "0 0 28px -8px rgba(159, 212, 255, 0.45)",
                "glow-lg": "0 0 60px -10px rgba(201, 184, 255, 0.40)",
            },
            screens: {
                xs: "450px",
            },
            backgroundImage: {
                "hero-pattern": "url('/herobg.png')",
                "space-grid":
                    "linear-gradient(rgba(201,184,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,184,255,0.05) 1px, transparent 1px)",
                "space-grid-bright":
                    "linear-gradient(rgba(201,184,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(201,184,255,0.55) 1px, transparent 1px)",
                "space-glow":
                    "radial-gradient(900px circle at 50% -10%, rgba(169,180,255,0.12), transparent 60%), radial-gradient(700px circle at 100% 20%, rgba(159,212,255,0.08), transparent 55%)",
            },
            backgroundSize: {
                "grid-40": "40px 40px",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "marquee-reverse": {
                    "0%": { transform: "translateX(-50%)" },
                    "100%": { transform: "translateX(0)" },
                },
                grain: {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "10%": { transform: "translate(-5%, -10%)" },
                    "20%": { transform: "translate(-15%, 5%)" },
                    "30%": { transform: "translate(7%, -25%)" },
                    "40%": { transform: "translate(-5%, 25%)" },
                    "50%": { transform: "translate(-15%, 10%)" },
                    "60%": { transform: "translate(15%, 0%)" },
                    "70%": { transform: "translate(0%, 15%)" },
                    "80%": { transform: "translate(3%, 35%)" },
                    "90%": { transform: "translate(-10%, 10%)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                },
            },
            animation: {
                marquee: "marquee 28s linear infinite",
                "marquee-reverse": "marquee-reverse 28s linear infinite",
                grain: "grain 8s steps(10) infinite",
                float: "float 6s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
