export const saveFile = (filename: string, contents: Blob) => {
  const element = document.createElement('a');
  element.download = filename;
  element.href = URL.createObjectURL(contents);
  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  element.remove();
};
