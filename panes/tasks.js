import van from "vanjs-core"
import columnhdr from "../components/columnhdr.js"

const { button, h1 } = van.tags

export const tasksHdr = (position = "", properties = {}) =>
    columnhdr(position, properties,
        h1("Tasks"),
        button("Add Task..."),
    )