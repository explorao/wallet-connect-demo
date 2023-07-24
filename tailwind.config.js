/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
        colors: {
            expGray: {
                50: "#EFEFEF",
                75: "#C7C7C7",
                85: "#BFBFBF",
                100: "#888888",
                200: "#707070",
            },
            expBlue: {
                800: "#001DFF",
            },
            expRed: {
                50: "#FFEFEF",
                800: "#FF0000",
                900: "#B70000",
            }
        },
    },
  },
  plugins: [],
}

