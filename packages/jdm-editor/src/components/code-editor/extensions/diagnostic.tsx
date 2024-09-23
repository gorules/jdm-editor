type RenderDiagnosticMessageParams = {
  text: string;
  className?: string;
};

export const renderDiagnosticMessage = ({ text, className }: RenderDiagnosticMessageParams) => {
  return text.replace(/`([^`]+)`/g, (match, content) => {
    let color;
    if (/^["'].*["']$/.test(content)) {
      color = '#077d16'; // Strings
    } else if (/^\d+$/.test(content)) {
      color = '#015cc5'; // Numbers
    } else {
      color = '#CE8E6D'; // Everything else
    }
    return `<span class="${className}" style="color: ${color};">${content}</span>`;
  });
};
