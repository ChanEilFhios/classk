import { header, button } from "../scripts/renderutils.js"

export default () => {
    return [
        header('Tasks', 2, []),
        button('+', 'primary', ['btn-sm'])
    ]
}