import { createContainerElem, createHdr } from "../scripts/renderutils.js"

export default () => {
    const rootEl = document.createElement("div")
    rootEl.classList.add("row")

    const today = createContainerElem(["col-4"], [createHdr("Today", 1)])
    const tasks = createContainerElem(["col-4"], [createHdr("Tasks", 1)])
    const exams = createContainerElem(["col-4"], [createHdr("Exams", 1)])

    rootEl.replaceChildren(today, tasks, exams)

    return rootEl
}