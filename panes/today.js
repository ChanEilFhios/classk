import van from "vanjs-core"
import columnhdr from "../components/columnhdr.js"
import formInput, { formInputProperties } from "../components/forminput.js"
import { Await, Modal } from "vanjs-ui"
import pane from "../components/pane.js"
import { getClasses, addClassModal, lastUpdate } from "../data/classes.js"

const { button, div, form, h1, label, span } = van.tags

export const todayHdr = (position, properties = {}) =>
    columnhdr(position, properties,
        span(
            h1("Today"),
            span(new Date().toDateString()),
        ),
        button({onclick: () => addClassModal()}, "Add Class..."),
    )

export const todayPane = (position, properties = {}) =>
    pane(position, properties,
        div("Classes"),
        div("Tomorrow")
    )

export const classesPane = (position, properties = {}) => {
    let previousUpdate = 0

    return () => pane(position, properties, h1("Classes:"),
                        (dom) => {
                            if (lastUpdate.val !== previousUpdate) {
                                previousUpdate = lastUpdate.val
                                const classes = van.state(getClasses())

                                return Await({
                                    value: classes.val,
                                    Loading: () => "🌀 Loading...",
                                    Error: (e) => `Unable to load: ${e}`
                                }, (classList) =>{
                                    console.log("rendering", classList)
                                    return classList
                                })
                            } else {
                                return dom
                            }
                        }
                    )
}