import van from "vanjs-core"
import columnhdr from "../components/columnhdr.js"

const { button, h1 } = van.tags

export const todoHdr = (position, properties = {}) =>
    columnhdr(position, properties,
        h1("To Dos"),
        button("Add To Do..."),
    )