import { header, button, addAttributes } from "../scripts/renderutils.js"

export default () => {
    return [
        header('Tasks', 1, ['d-inline', 'align-middle']),
        addAttributes(button('+', 'primary', ['btn-sm', 'align-middle', 'ms-2']), [
            {attribute: "data-bs-toggle", value: "modal"},
            {attribute: "data-bs-target", value: "#classktask"}
        ])
    ]
}