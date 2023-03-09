/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'title': '#e1e1e6',
      'subTitle': '#7c7c8a',
      'background': '#121214',
      'background2': '#202024',
      'btn-login': '#06B6D4',
      'btn-create': '#22c55e',
      'transp-modal': 'rgba(34,34,34,0.4)',
    },
    extend: {},
  },
  plugins: [],
}
