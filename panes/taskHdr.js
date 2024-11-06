import { header, button } from "../scripts/renderutils.js"

export default () => {
    return [
        header('Tasks', 2, []),
        button('Add Task', 'primary', ['btn-sm'])
    ]
}