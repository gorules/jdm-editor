const unsecuredCopyToClipboard = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  document.body.removeChild(textArea);
};

export const copyToClipboard = async (content: string) => {
  if (window.isSecureContext && navigator.clipboard) {
    await navigator.clipboard.writeText(content);
  } else {
    unsecuredCopyToClipboard(content);
  }
};

export const pasteFromClipboard = async (): Promise<string> => {
  try {
    return navigator.clipboard.readText();
  } catch {
    return '';
  }
};

export const get = <T>(obj: any, path: string, defaultValue: T): T => {
  return path.split('.').reduce((a, c) => (a && a[c] ? a[c] : defaultValue || null), obj) as T;
};
