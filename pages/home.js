import { row, header, col } from "../scripts/renderutils.js"

export default () => {
    const rootEl = row([], [
        col(4, [], [
            header("Today", 1)
        ]),
        col(4, [], [
            header("Tasks", 1)
        ]),
        col(4, [], [
            header("Exams", 1)
        ])
    ])

    rootEl.replaceChildren(today, tasks, exams)

    return rootEl
}