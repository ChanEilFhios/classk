import van from "vanjs-core"
import columnhdr from "../components/columnhdr.js"

const { button, h1 } = van.tags

export const examHdr = (position = "", properties = {}) =>
    columnhdr(position, properties,
        h1("Exams"),
        button("Add Exam..."),
    )