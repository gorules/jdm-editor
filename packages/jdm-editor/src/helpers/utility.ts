export const isTrue = (str: string | boolean | number | undefined) => {
  if (typeof str === 'string') return ((str as string) || '').toLowerCase() === 'true';
  else if (typeof str === 'boolean') return str === true;
  else if (typeof str === 'number') return str === 1;
  return false;
};

export const chunk = <T = unknown>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));

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
