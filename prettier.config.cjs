/** @type {import("prettier").Config} */
module.exports = {
  quoteProps: 'consistent',
  semi: false,
  singleQuote: true,
  tailwindAttributes: ['class', 'className', 'classes'],
  trailingComma: 'es5',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
}
