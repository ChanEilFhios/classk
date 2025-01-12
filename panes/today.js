import van from "vanjs-core"
import columnhdr from "../components/columnhdr.js"
import formInput, { formInputProperties } from "../components/forminput.js"
import { Await, Modal } from "vanjs-ui"
import pane from "../components/pane.js"
import { getClasses, addClass, lastUpdate } from "../data/classes.js"

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

export const addClassModal = (initialData) => {
    const closed = van.state(false)
    const formInputs = [
        formInputProperties("Name", "classname", "text", {required: true}),
        formInputProperties("Building", "classbuilding", "text"),
        formInputProperties("Teacher", "classteacher", "text"),
        formInputProperties("Room", "classroom", "text"),
        formInputProperties("Start", "classtart", "time"),
        formInputProperties("End", "classend", "time")
    ]
    
    const dayInputs = [
        formInputProperties("Monday", "classmonday", "checkbox"),
        formInputProperties("Tuesday", "classtuesday", "checkbox"),
        formInputProperties("Wednesday", "classwednesday", "checkbox"),
        formInputProperties("Thursday", "classthursday", "checkbox"),
        formInputProperties("Friday", "classfriday", "checkbox"),
    ]

    const onOK = (e) => {
        const formData = new FormData(document.getElementById("classform"))

        addClass(Object.fromEntries(formData))
        closed.val = true
    }

    van.add(document.body,
        Modal({closed}, 
            form({id: "classform", class: "twocolumn modalform"},
                ...formInputs.map((properties) => formInput(properties)),

                label("Days"),
                div({class: "span3"},
                    ...dayInputs.map((properties) => formInput(properties).reverse())
                )
            ),
            div({class: "modalbuttons"},
                button({onclick: onOK}, "Ok"),
                button({onclick: () => closed.val = true}, "Cancel")
            )
        )
    )
}