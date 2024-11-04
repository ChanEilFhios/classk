export default () => {
    const rootEl = document.createElement("div")
    rootEl.classList.add("row")

    const leftPane = document.createElement("div")
    leftPane.classList.add("col-4")
    leftPane.innerText = "Left"

    const middlePane = document.createElement("div")
    middlePane.classList.add("col-4")
    middlePane.innerText = "middle"

    const rightPane = document.createElement("div")
    rightPane.classList.add("col-4")
    rightPane.innerText = "Right"


    rootEl.replaceChildren([leftPane, middlePane, rightPane])

    return rootEl
}