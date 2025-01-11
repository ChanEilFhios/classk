import van from "vanjs-core"
import columnhdr from "../components/columnhdr.js"
import formInput, { formInputProperties } from "../components/forminput.js"
import { Modal } from "vanjs-ui"

const { button, div, form, h1, input, label, span, table, tbody, th, thead, tr } = van.tags

export const todayHdr = (position, properties = {}) =>
    columnhdr(position, properties,
        span(
            h1("Today"),
            span(new Date().toDateString()),
        ),
        button({onclick: () => addClassModal()}, "Add Class..."),
    )

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

        console.log(Object.fromEntries(formData))
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