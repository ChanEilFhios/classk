import van from "vanjs-core"
import { handleElementParams } from "../utilities/display.js"

const { div } = van.tags

export default (position = "", propsOrChild = {}, ...childList) => {
    const {properties, children} = handleElementParams(propsOrChild, childList)

    return div({...properties, class: `${properties.class || ""} pane ${position}`}, children)
}