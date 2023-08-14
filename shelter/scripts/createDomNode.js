const createDomNode = (
  node,
  className = null,
  tagName = 'div',
  content = null,
  src = null,
  alt = null,
  isAppend = true
) => {
  const elem = document.createElement(tagName);

  if (className) {
    Array.isArray(className)
      ? className.forEach((el) => elem.classList.add(el))
      : elem.classList.add(className);
  }

  if (src) {
    elem.src = src;
    elem.alt = alt;
  }

  if (tagName === 'button') elem.type = 'button';

  elem.textContent = content;

  isAppend ? node.append(elem) : node.prepend(elem);

  return elem;
};

export default createDomNode;
