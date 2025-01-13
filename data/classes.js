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

export const addClass = (newClassValues) => {
  dataMgr()
    .class.put({
      id: newClassValues.id,
      name: newClassValues.Name,
      start: newClassValues.Start,
      end: newClassValues.End,
      building: newClassValues.Building,
      room: newClassValues.Room,
      teacher: newClassValues.Teacher,
      active: newClassValues.active || classActive,
      days: {
        monday: newClassValues.Monday,
        tuesday: newClassValues.Tuesday,
        wednesday: newClassValues.Wednesday,
        thursday: newClassValues.Thursday,
        friday: newClassValues.Friday,
      },
    })
    .then(() => (lastUpdate.val = Date.now()))
}

const timeNameItem = (aClass) =>
  div(
    { class: "timenameitem" },
    div({ class: "classtimes" }, aClass.start, br(), aClass.end),
    div({ class: "classname" }, aClass.name),
    button(
      {
        title: "Edit or delete this class",
        onclick: (e) => addClassModal(aClass),
      },
      "Δ"
    )
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

export const addClassModal = (initialData = {}) => {
  const closed = van.state(false)
  const formInputs = [
    formInputProperties("Name", "classname", "text", {
      required: true,
      value: initialData.name || "",
    }),
    formInputProperties("Building", "classbuilding", "text", {
      value: initialData.building || "",
    }),
    formInputProperties("Teacher", "classteacher", "text", {
      value: initialData.teacher || "",
    }),
    formInputProperties("Room", "classroom", "text", {
      value: initialData.room || "",
    }),
    formInputProperties("Start", "classtart", "time", {
      value: initialData.start || "",
    }),
    formInputProperties("End", "classend", "time", {
      value: initialData.end || "",
    }),
  ]

  const dayInputs = [
    formInputProperties("Monday", "classmonday", "checkbox", {
      checked:
        initialData.days && initialData.days.monday === "on" ? true : false,
    }),
    formInputProperties("Tuesday", "classtuesday", "checkbox", {
      checked:
        initialData.days && initialData.days.tuesday === "on" ? true : false,
    }),
    formInputProperties("Wednesday", "classwednesday", "checkbox", {
      checked:
        initialData.days && initialData.days.wednesday === "on" ? true : false,
    }),
    formInputProperties("Thursday", "classthursday", "checkbox", {
      checked:
        initialData.days && initialData.days.thursday === "on" ? true : false,
    }),
    formInputProperties("Friday", "classfriday", "checkbox", {
      checked:
        initialData.days && initialData.days.friday === "on" ? true : false,
    }),
  ]

  const onOK = (e) => {
    const formData = Object.fromEntries(
      new FormData(document.getElementById("classform"))
    )

    formData.active = initialData.active || classActive
    formData.id = initialData.id
    addClass(formData)

    closed.val = true
  }

  const onDelete = (e) => {
    console.log("Asked to delete class with ID:", initialData.id)
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
        initialData.id
          ? button({ class: "deletebtn", onclick: onDelete }, "Delete")
          : "",
        button({ onclick: onOK }, "Ok"),
        button({ onclick: () => (closed.val = true) }, "Cancel")
      )
    )
  )
}
