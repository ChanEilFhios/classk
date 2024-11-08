import { header, button, addAttribute } from "../scripts/renderutils.js"

export default () => {
    return [
        header('Tasks', 1, ['d-inline', 'align-middle']),
        addAttributes(button('+', 'primary', ['btn-sm', 'align-middle', 'ms-2']), [
            "data-bs-toggle", "modal",
            "data-bs-target", "#classktask"
        ])
    ]
}