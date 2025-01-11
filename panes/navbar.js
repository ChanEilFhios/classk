import van from "vanjs-core"
import pane from "../components/pane.js"
import { cloudStatus } from "../data/datamgr.js"

const { a, div, h1, span } = van.tags

export const vnav = (position = "", properties = {}) =>
    pane(position, {...properties, class: `${properties.class || ""} vnav`},
        h1("Classk"),
        
        cloudStatus()
    )