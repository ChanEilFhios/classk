import van from "vanjs-core"
import columnhdr from "../components/columnhdr.js"
import { Await } from "vanjs-ui"
import pane, { paneSection } from "../components/pane.js"
import { getClasses, addClassModal, lastUpdate } from "../data/classes.js"

const { button, h1, span } = van.tags

export const todayHdr = (position, properties = {}) =>
  columnhdr(
    position,
    properties,
    span(h1("Today"), span(new Date().toDateString())),
    button({ onclick: () => addClassModal() }, "Add Class...")
  )

export const todayPane = (position, properties = {}) =>
  pane(position, properties, paneSection("Classes", properties, classesPane()))

export const classesPane = (position, properties = {}) => {
  let previousUpdate = 0

  return () =>
    pane(position, properties, (dom) => {
      if (lastUpdate.val !== previousUpdate) {
        previousUpdate = lastUpdate.val
        const classes = van.state(getClasses())

        return Await(
          {
            value: classes.val,
            Loading: () => "🌀 Loading...",
            Error: (e) => `Unable to load: ${e}`,
          },
          (classList) => {
            console.log("rendering", classList)
            return classList
          }
        )
      } else {
        return dom
      }
    })
}
