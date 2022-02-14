module.exports = {
  darkMode: 'class',
  // purge: {
  //   enabled: true,
  //   content: ["./pages/**/*.{js,ts,jsx,tsx}",
  //     "./components/**/*.{js,ts,jsx,tsx}",
  //   ],
  //   options: {
  //     safelist: ['dark'], //specific classes
  //   },
  // },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    typography: (theme) => ({}),
    extend: {
      typography: (theme) => ({
        dark: {
          css: {
            color: 'white',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'),require("daisyui")],
  variants: {
    typography: ['dark'],
  },
};
