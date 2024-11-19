import { row, header, col } from "../scripts/renderutils.js"
import { arrayify } from "../scripts/utils.js"
import taskHeader from "../panes/taskHdr.js"
import taskList from "../panes/tasklist.js"

export default () => {
    return [
        row(['border-bottom', 'home-nav'], [
            col(4, [], [
                header("Today", 1)
            ]),
            col(4, ['d-flex', 'align-items-center'],
                arrayify(taskHeader())
            ),
            col(4, [], [
                header("Exams", 1)
            ])
        ]),
        row(['home-content'], [
            col(4, ['border-end'], [
                header("Today", 1)
            ]),
            col(4, ['border-end'],
                arrayify(taskList())
            ),
            col(4, [''], [
                header("Exams", 1)
            ])
        ])
    ]
}