import { header, button } from "../scripts/renderutils.js"

export default () => {
    return [
        header('Tasks', 2, ['d-inline']),
        button('+', 'primary', ['btn-sm'])
    ]
}