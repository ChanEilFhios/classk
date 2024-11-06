import { header, button } from "../scripts/renderutils.js"

export default () => {
    return [
        header('Tasks', 2, ['d-inline', 'align-middle']),
        button('+', 'primary', ['btn-sm', 'align-middle', 'ms-2'])
    ]
}