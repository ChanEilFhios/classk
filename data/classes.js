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
      checked: (initialData.days && initialData.days.monday) || "on",
    }),
    formInputProperties("Tuesday", "classtuesday", "checkbox", {
      checked: (initialData.days && initialData.days.tuesday) || "on",
    }),
    formInputProperties("Wednesday", "classwednesday", "checkbox", {
      checked: (initialData.days && initialData.days.wednesday) || "on",
    }),
    formInputProperties("Thursday", "classthursday", "checkbox", {
      checked: (initialData.days && initialData.days.thursday) || "on",
    }),
    formInputProperties("Friday", "classfriday", "checkbox", {
      checked: (initialData.days && initialData.days.friday) || "on",
    }),
  ]

  const onOK = (e) => {
    const formData = Object.fromEntries(
      new FormData(document.getElementById("classform"))
    )

    if (initialData.id) {
      console.log("Updating", formData, "over", initialData)
    } else {
      addClass(formData)
    }
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
