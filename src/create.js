/* eslint-disable import/prefer-default-export */
const create = (element, id, cls, text, append) => {
  const el = document.createElement(element);
  el.id = id;
  el.classList.add(cls);
  el.textContent = text;
  append.appendChild(el);
};

export { create };
