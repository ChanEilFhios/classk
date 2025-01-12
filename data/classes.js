import van from "vanjs-core"
import { dataMgr } from "./datamgr.js"
import formInput, { formInputProperties } from "../components/forminput.js"
import { Await, Modal } from "vanjs-ui"

const { br, button, div, form, label } = van.tags

export const lastUpdate = van.state(Date.now())
export const schema = "@id,name,start,end,days"

const timeNameItem = (aClass) =>
  div(
    { class: "timenameitem" },
    div({ class: "classtimes" }, aClass.start, br(), aClass.end),
    div({ class: "classname" }, aClass.name)
  )

export const listClasses = (renderClass = timeNameItem) => {
  let previousUpdate = 0

  return () =>
    div((dom) => {
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
            const classListElements = classList.map(renderClass)
            console.log("rendering", classListElements)
            return div(classListElements)
          }
        )
      } else {
        return dom
      }
    })
}

export const addClassModal = (initialData) => {
  const closed = van.state(false)
  const formInputs = [
    formInputProperties("Name", "classname", "text", { required: true }),
    formInputProperties("Building", "classbuilding", "text"),
    formInputProperties("Teacher", "classteacher", "text"),
    formInputProperties("Room", "classroom", "text"),
    formInputProperties("Start", "classtart", "time"),
    formInputProperties("End", "classend", "time"),
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

  van.add(
    document.body,
    Modal(
      { closed },
      form(
        { id: "classform", class: "twocolumn modalform" },
        ...formInputs.map((properties) => formInput(properties)),

        label("Days"),
        div(
          { class: "span3" },
          ...dayInputs.map((properties) => formInput(properties).reverse())
        )
      ),
      div(
        { class: "modalbuttons" },
        button({ onclick: onOK }, "Ok"),
        button({ onclick: () => (closed.val = true) }, "Cancel")
      )
    )
  )
}

export const getClasses = () => {
  return dataMgr().class.toArray()
}

export const addClass = (newClass) => {
  dataMgr()
    .class.put({
      name: newClass.Name,
      start: newClass.Start,
      end: newClass.End,
      building: newClass.Building,
      room: newClass.Room,
      teacher: newClass.Teacher,
      days: {
        monday: newClass.Monday,
        tuesday: newClass.Tuesday,
        wednesday: newClass.Wednesday,
        thursday: newClass.Thursday,
        friday: newClass.friday,
      },
    })
    .then(() => (lastUpdate.val = Date.now()))
}
