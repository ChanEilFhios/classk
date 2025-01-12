import van from "vanjs-core"
import columnhdr from "../components/columnhdr.js"
import { Await } from "vanjs-ui"
import pane, { paneSection } from "../components/pane.js"
import { listClasses, addClassModal } from "../data/classes.js"

const { button, div, h1, span } = van.tags

export const todayHdr = (position, properties = {}) =>
  columnhdr(
    position,
    properties,
    span(h1("Today"), span(new Date().toDateString())),
    button({ onclick: () => addClassModal() }, "Add Class...")
  )

export const todayPane = (position, properties = {}) =>
  pane(position, properties, paneSection("Classes", listClasses()))
