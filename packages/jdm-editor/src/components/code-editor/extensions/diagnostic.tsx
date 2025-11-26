type RenderDiagnosticMessageParams = {
  text: string;
  className?: string;
};

export const renderDiagnosticMessage = ({ text, className }: RenderDiagnosticMessageParams) => {
  return text.replace(/`([^`]+)`/g, (match, content) => {
    let color;
    if (/^["'].*["']$/.test(content)) {
      color = '#6aab73'; // Strings
    } else if (/^\d+$/.test(content)) {
      color = '#57a8f5'; // Numbers
    } else {
      color = '#CE8E6D'; // Everything else
    }
    return `<span class="${className}" style="color: ${color};">${escapeHtml(content)}</span>`;
  });
};

export const escapeHtml = (str: string) => {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
};
