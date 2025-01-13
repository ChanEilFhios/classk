import van from "vanjs-core"
import { dataMgr } from "./datamgr.js"
import formInput, { formInputProperties } from "../components/forminput.js"
import { Await, Modal } from "vanjs-ui"

const { br, button, div, form, label } = van.tags

export const lastUpdate = van.state(Date.now())
export const schema = "++id, name, active"

const classActive = "yes"

export const getClasses = (
  days = ["monday", "tuesday", "wednesday", "thursday", "friday"],
  active = classActive
) => {
  return dataMgr()
    .class.where("active")
    .equals(active)
    .filter((aClass) => {
      return days.reduce((acc, day) => aClass.days[day] === "on" || acc, false)
    })
    .sortBy("start")
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
      active: classActive,
      days: {
        monday: newClass.Monday,
        tuesday: newClass.Tuesday,
        wednesday: newClass.Wednesday,
        thursday: newClass.Thursday,
        friday: newClass.Friday,
      },
    })
    .then(() => (lastUpdate.val = Date.now()))
}

const timeNameItem = (aClass) =>
  div(
    { class: "timenameitem" },
    div({ class: "classtimes" }, aClass.start, br(), aClass.end),
    div({ class: "classname" }, aClass.name),
    button("Δ")
  )

export const listClasses = (classes, renderClass = timeNameItem) => {
  return (dom) => {
    return Await(
      {
        value: classes,
        Loading: () => "🌀 Loading...",
        Error: (e) => `Unable to load: ${e}`,
      },
      (classList) =>
        div({ class: "classListWrapper" }, classList.map(renderClass))
    )
  }
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
