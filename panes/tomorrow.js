import van from "vanjs-core"
import columnhdr from "../components/columnhdr.js"
import pane, { paneSection } from "../components/pane.js"
import {
  listClasses,
  addClassModal,
  getClasses,
  lastUpdate,
} from "../data/classes.js"
import { weekDayNames } from "../utilities/text.js"

const { button, h1, span } = van.tags

export const tomorrowHdr = (position, properties = {}) =>
  columnhdr(position, properties, h1("Tomorrow"))

export const tomorrowPane =
  (position, properties = {}) =>
  (dom) => {
    let previousVal

    if (lastUpdate.val !== previousVal) {
      previousVal = lastUpdate.val
      return pane(
        position,
        properties,
        paneSection(
          "Classes",
          listClasses(getClasses([weekDayNames[(new Date().getDay() + 1) % 7]]))
        )
      )
    } else return dom
  }
