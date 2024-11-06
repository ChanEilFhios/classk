import { header, button } from "../scripts/renderutils.js"

export default () => {
    return [
        header('Tasks', 1, ['d-inline', 'align-middle']),
        button('+', 'primary', ['btn-sm', 'align-middle', 'ms-2'])
    ]
}