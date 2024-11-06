import { header, button } from "../scripts/renderutils.js"

export default () => {
    return [
        header('Tasks', 1),
        button('Add Task', "primary")
    ]
}