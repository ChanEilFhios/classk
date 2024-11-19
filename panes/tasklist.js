import { getTasks } from "../data/task.js"
import { header, div, setText, tombstone } from "../scripts/renderutils.js"

export default () => {
    return [
        header('Today', 2, ['d-inline', 'align-middle']),
        tombstone(getTasks().then((tasks) => {
            return setText(div(), tasks)
        }))
    ]
}