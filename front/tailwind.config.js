/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        cart: "url(/src/fonts/shopping-cart.svg)",
        "cart-white": "url(/src/fonts/shopping-cart-white.svg)",
        pencil: "url(/src/fonts/pencil.svg)",
      },
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        "50%": "50%",
        4: "2rem",
      },
    },
  },
  plugins: [],
};