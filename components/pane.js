import van from "vanjs-core"
import { handleElementParams } from "../utilities/display.js"

const { div, h1 } = van.tags

export default (position = "", propsOrChild = {}, ...childList) => {
  const { properties, children } = handleElementParams(propsOrChild, childList)

  return div(
    { ...properties, class: `${properties.class || ""} pane ${position}` },
    children
  )
}

export const paneSection = (heading, propsOrChild = {}, ...childList) => {
  const { properties, children } = handleElementParams(propsOrChild, childList)
  children.unshift(h1({ class: "panesectionheading" }, heading))

  return div(
    { ...properties, class: `${properties.class || ""} panesection` },
    children
  )
}
