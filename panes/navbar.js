import van from "vanjs-core"
import pane from "../components/pane.js"
import { cloudStatus } from "../data/datamgr.js"
import { capitalizeWord } from "../utilities/text.js"

const { h1, span } = van.tags

export const vnav = (position = "", properties = {}) =>
    pane(position, {...properties, class: `${properties.class || ""} vnav`},
        h1("Classk"),

        span({class: "navstatus"}, () => capitalizeWord(cloudStatus().val))
    )