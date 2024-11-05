import { row, header, col } from "../scripts/renderutils.js"

export default () => {
    return [
        row(['border-bottom'], [
            col(4, [], [
                header("Today", 1)
            ]),
            col(4, [], [
                header("Tasks", 1)
            ]),
            col(4, [], [
                header("Exams", 1)
            ])
        ]),
        row([], [
            col(4, ['border-end', 'minParentHeight'], [
                header("Today", 1)
            ]),
            col(4, ['border-end', 'minParentHeight'], [
                header("Tasks", 1)
            ]),
            col(4, ['minParentHeight'], [
                header("Exams", 1)
            ])
        ])
    ]
}