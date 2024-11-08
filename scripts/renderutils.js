import { arrayify } from "./utils.js"
import { Modal } from 'bootstrap'

//Helpers
export const renderPane =
    (parentElement, renderFn) => parentElement.replaceChildren(...arrayify(renderFn()))

export const openDlg = () => {
    const dlgId = window.prompt("Which dialog?")

    if (dlgId) {
        const modal = new Modal(document.getElementById(dlgId))
        modal.show()
    }
}

export const createElem = (classes = [], tag = "div", id = '') => {
    const newEl = document.createElement(tag)

    classes.forEach(newClass => newClass && newEl.classList.add(newClass))
    if (id) newEl.id = id

    return newEl
}

export const addHandler = (element, handler, event = "click") => {
    element.addEventListener(event, handler)

    return element
}

export const addAttribute = (element, attribute, value) => {
    element.setAttribute(attribute, value)

    return element
}

export const addAttributes = (element, valueNamePairs = []) => {
    valueNamePairs.forEach(({attribute, value}) => element.setAttribute(attribute, value))

    return element
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

export const button = (text, type, classes = [], id = '') => {
    classes.push('btn')
    classes.push(`btn-outline-${type}`)

    const newEl = createElem(classes, "button", id)
    newEl.innerHTML = text
    newEl.setAttribute('type', 'button')

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