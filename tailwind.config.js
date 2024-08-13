/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightblue': '#ADD8E6', // Define light blue color
        'light-grey': '#F0F0F0', // Light grey color for the card
      },
      backgroundColor: {
        'dark-mode': '#1a202c', // Dark mode background color (for the main background)
        'light-mode': '#f7fafc', // Light mode background color
        'card-dark-mode': '#2d3748', // Dark mode card color (lighter grey)
        'card-light-mode': '#F0F0F0', // Light mode card color
      },
      textColor: {
        'dark-mode': '#edf2f7', // Dark mode text color
        'light-mode': '#2d3748', // Light mode text color
      },
    },
    screens: {
      'sm': '640px',   // Small devices (landscape phones, 640px and up)
      'md': '768px',   // Medium devices (tablets, 768px and up)
      'lg': '1024px',  // Large devices (desktops, 1024px and up)
      'xl': '1280px',  // Extra large devices (large desktops, 1280px and up)
      '2xl': '1536px', // Extra extra large devices (larger desktops, 1536px and up)
    },
  },
  plugins: [],
  darkMode: 'class', // Enable class-based dark mode
}
