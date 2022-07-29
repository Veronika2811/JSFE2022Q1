export default function createDomNode(tag: string, className?: string[], parentNode?: HTMLElement, text?: string) {
  const elem = document.createElement(tag);
  if (className) {
    className.forEach(el => elem.classList.add(el));
  }
  if (parentNode) {
    parentNode.append(elem);
  }
  if (text) {
    elem.textContent = text;
  }
  return elem;
}