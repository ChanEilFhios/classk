export const renderPane =
    (parentElement, renderFn) => parentElement.replaceChildren(renderFn())

export const createElem = (classes = [], tag = "div", id = '') => {
    const newEl = document.createElement(tag)

    classes.forEach(newClass => newEl.classList(newClass))
    if (id) newEl.id = id

    return newEl
}

export const createContainerElem = (classes = [], children = [], id = '') => {
    const newEl = createElem(classes, tag, id)

    newEl.replaceChildren(...children)

    return newEl
}

export const createHdr = (text, level, classes = [], id = '') => {
    const newEl = createElem(classes, `h${level}`, id)

    newEl.innerText = text

    return newEl
}