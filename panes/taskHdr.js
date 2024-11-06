import { header, button } from "../scripts/renderutils.js"

export default () => {
    return [
        header('Tasks', 2, ['d-inline', 'align-middle']),
        button('Add Task', 'primary', ['align-middle', 'ms-2'])
    ]
}