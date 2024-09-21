export const renderDiagnosticMessage = (text: string) => {
  return text.replace(/`([^`]+)`/g, (match, content) => {
    let color;
    if (/^["'].*["']$/.test(content)) {
      color = '#077d16'; // Strings
    } else if (/^\d+$/.test(content)) {
      color = '#015cc5'; // Numbers
    } else {
      color = '#CE8E6D'; // Everything else
    }
    return `<span class="cm-diagnosticMessageToken" style="color: ${color};">${content}</span>`;
  });
};
