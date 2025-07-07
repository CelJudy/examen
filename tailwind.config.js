/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                primary: {
                  50: "#F0F7FF",
                  100: "#E1EFFF",
                  200: "#B8DAFF",
                  300: "#8FC5FF",
                  400: "#57A8FE",
                  500: "#027AFE",
                  600: "#016FE5",
                  700: "#0163CB",
                  800: "#014FA3",
                  900: "#003670",
                  950: "#002751"
                },
                secondary: {
                  50: "#F2F2FD",
                  100: "#EAE9FB",
                  200: "#D0D0F6",
                  300: "#B3B1F1",
                  400: "#8C8BEA",
                  500: "#4E4CDE",
                  600: "#4441DC",
                  700: "#2B28D7",
                  800: "#2522B9",
                  900: "#171574",
                  950: "#0F0E4E"
                },
                
                accent: {
                    50: "#F0FFF9",
                    100: "#E0FFF3",
                    200: "#BDFFE6",
                    300: "#8FFFD4",
                    400: "#52FFBD",
                    500: "#00FA9A",
                    600: "#00E68E",
                    700: "#00C77B",
                    800: "#00A365",
                    900: "#007A4B",
                    950: "#005735"
                },
                muted: {
                    50: "#FAFAFA",
                    100: "#F5F5F5",
                    200: "#EDEDED",
                    300: "#E3E3E3",
                    400: "#D6D6D6",
                    500: "#CCCCCC",
                    600: "#B8B8B8",
                    700: "#A1A1A1",
                    800: "#878787",
                    900: "#616161",
                    950: "#454545",
                },
            }
        },
    },
    plugins: [],
}

