import { arrayify } from "./utils"

export const renderPane =
    (parentElement, renderFn) => parentElement.replaceChildren(...arrayify(renderFn()))

export const createElem = (classes = [], tag = "div", id = '') => {
    const newEl = document.createElement(tag)

    classes.forEach(newClass => newEl.classList.add(newClass))
    if (id) newEl.id = id

    return newEl
}

//Std Dom Elements
export const div = (classes = [], children = [], id = '') => {
    const newEl = createElem(classes, "div", id)

    newEl.replaceChildren(...children)

    return newEl
}

export const header = (text, level, classes = [], id = '') => {
    const newEl = createElem(classes, `h${level}`, id)

    newEl.innerText = text

    return newEl
}

//Bootstrap Elements
export const row = (classes = [], children = [], id = '') => {
    classes.push("row")

    return div(classes, children, id)
}

export const col = (width, classes = [], children = [], id = '') => {
    if (width > 0 && width < 13)
        classes.push(`col-${width}`)
    else
        classes.push('col')

    return div(classes, children, id)
}