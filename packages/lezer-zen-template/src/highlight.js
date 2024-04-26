import { styleTags, tags as t } from '@lezer/highlight';

export const zenHighlight = styleTags({
  'Text': t.content,
  'ExpressionOpen ExpressionClose': t.special(t.brace),
});
