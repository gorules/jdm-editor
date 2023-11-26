const isMac = navigator.platform.includes('Mac');

const keyMaps: Record<string, string> = {
  Ctrl: '⌘',
  Backspace: '⌫',
  Alt: '⌥',
};

export const platform = {
  shortcut: (s: string): string => {
    if (!isMac) return s;

    return Object.keys(keyMaps).reduce((acc, key) => acc.replaceAll(key, keyMaps[key]), s);
  },
};
