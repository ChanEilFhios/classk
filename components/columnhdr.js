import van from "vanjs-core"
import { handleElementParams } from "../utilities/display.js"
import pane from "./pane.js"

const { div } = van.tags

export default (position = "", propsOrChild = {}, ...childList) => {
    const {properties, children} = handleElementParams(propsOrChild, childList)

    return pane(position, {...properties, class: `${properties.class || ""} columnheader`}, ...children)
}