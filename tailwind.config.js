/** @type {import('tailwindcss').Config} */

const genSizeMap = (size) =>
  Array.from({ length: size }).reduce(
    (map, _, i) => ({
      ...map,
      [i]: `${i}px`,
    }),
    {}
  );

module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/layouts/**/*.tsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        cbd: "linear-gradient(90deg, rgba(255, 0, 0, 1) 0%, rgba(0, 0, 255, 1) 50%, rgba(255, 0, 0, 1) 100%)",
        cbdd: "linear-gradient(271deg, rgba(255, 0, 0, 0.8) 0.42%, rgba(255, 0, 0, 0.8) 49.92%, rgba(255, 0, 0, 0.8) 99.42%);"
      },
      backgroundSize: {
        'size-full': '100% 100%'
      },
      fontSize: { ...genSizeMap(100) },
      padding: { ...genSizeMap(100) },
      spacing: { ...genSizeMap(100) },
      borderRadius: { ...genSizeMap(100) },
      width: {
        ...genSizeMap(100),
        full: '100%',
      },
      height: {
        ...genSizeMap(100),
        full: '100%',
      },
      lineHeight: { ...genSizeMap(100) },
      minHeight: {
        ...genSizeMap(100),
        contentHeight: 'calc(100vh - 48px)',
      },
      screens: {
        'pad': '640px',
        'pc': '1200px'
      }
    },
  },
  plugins: [],
};
