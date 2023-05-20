module.exports = {
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: true,
  quoteProps: 'consistent',
  semi: false,
  importOrder: [
    '^[!^./]', // imports from external packages
    '^[./].*$', // imports from internal source code
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
