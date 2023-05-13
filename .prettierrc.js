module.exports = {
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
