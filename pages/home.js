import { createContainerElem, createHdr } from "../scripts/renderutils"

export default () => {
    const rootEl = document.createElement("div")
    rootEl.classList.add("row")

    const today = createContainerElem(["col-4"], [createHdr("Today", 1)])

    const middlePane = document.createElement("div")
    middlePane.classList.add("col-4")
    middlePane.innerText = "Tasks"

    const rightPane = document.createElement("div")
    rightPane.classList.add("col-4")
    rightPane.innerText = "Exams"


    rootEl.replaceChildren(today, middlePane, rightPane)

    return rootEl
}