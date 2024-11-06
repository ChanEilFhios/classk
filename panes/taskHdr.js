import { header, button } from "../scripts/renderutils.js"

export default () => {
    return [
        header('Tasks', 1, ["d-inline"]),
        button('Add Task', "primary")
    ]
}