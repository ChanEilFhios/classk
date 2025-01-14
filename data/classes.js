import van from "vanjs-core"
import { dataMgr } from "./datamgr.js"
import { dataDefEntry, indexTypes } from "../utilities/data.js"
import formInput from "../components/forminput.js"
import { Await, Modal, Tooltip } from "vanjs-ui"
import { getContrastColor } from "../utilities/display.js"

const { br, button, div, form, label } = van.tags

const fieldNames = [
  "id",
  "name",
  "building",
  "teacher",
  "room",
  "start",
  "end",
  "color",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
]

const fieldDefinitions = {
  id: dataDefEntry("id", undefined, "hidden", indexTypes.primary),
  name: dataDefEntry("name", "Name", "text", indexTypes.index, {
    required: true,
  }),
  building: dataDefEntry("building", "Building", "text"),
  teacher: dataDefEntry("teacher", "Teacher", "text"),
  room: dataDefEntry("room", "Room", "text"),
  start: dataDefEntry("start", "Start", "time", indexTypes.index),
  end: dataDefEntry("end", "End", "time"),
  color: dataDefEntry("color", "Color", "color", undefined, { class: "span3" }),
  monday: dataDefEntry("monday", "Monday", "checkbox", indexTypes.index),
  tuesday: dataDefEntry("tuesday", "Tuesday", "checkbox", indexTypes.index),
  wednesday: dataDefEntry(
    "wednesday",
    "Wednesday",
    "checkbox",
    indexTypes.index
  ),
  thursday: dataDefEntry("thursday", "Thursday", "checkbox", indexTypes.index),
  friday: dataDefEntry("friday", "Friday", "checkbox", indexTypes.index),
}

export const lastUpdate = van.state(Date.now())
export const schema = fieldNames
  .map((name) => fieldDefinitions[name].schema)
  .filter((schema) => schema)
  .join(", ")

export const getClasses = (days) => {
  if (!days) return dataMgr().class.toArray()
  else
    return days
      .reduce((query, day, idx) => {
        const next = idx === 0 ? query.where(day) : query.or(day)
        return next.equals("true")
      }, dataMgr().class)
      .sortBy("start")
}

export const removeClass = (classId) => {
  dataMgr()
    .class.delete(classId)
    .then(() => (lastUpdate.val = Date.now()))
}

export const addClass = (newClassValues) => {
  dataMgr()
    .class.put(newClassValues)
    .then(() => (lastUpdate.val = Date.now()))
}

const timeNameItem = (aClass) => {
  const showTooltip = van.state(false)

  return div(
    { class: "timenameitem" },
    div({ class: "classtimes" }, aClass.start, br(), aClass.end),
    div(
      {
        class: "classname",
        onmouseenter: () => (showTooltip.val = true),
        onmouseleave: () => (showTooltip.val = false),
        style: `
        position: relative;
        background-color: ${aClass.color};
        color: ${getContrastColor(aClass.color)}`,
      },
      aClass.name,
      Tooltip({
        text: `${aClass.teacher} - ${aClass.building} Room:${aClass.room}
        [${["monday", "tuesday", "wednesday", "thursday", "friday"]
          .filter((day) => aClass[day] === "true")
          .map((day) => (day === "thursday" ? day.slice(0, 2) : day.charAt(0)))
          .map((abbrev) => abbrev.toUpperCase())
          .join(", ")}]`,
        show: showTooltip,
      })
    ),
    button(
      {
        title: "Edit or delete this class",
        onclick: (e) => addClassModal(aClass),
      },
      "Δ"
    )
  )
}

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

  const onOK = (e) => {
    const formData = Object.fromEntries(
      new FormData(document.getElementById("classform"))
    )
    formData.id = initialData.id

    const classObj = fieldNames.reduce((acc, field) => {
      const fieldDefinition = fieldDefinitions[field]
      acc[field] = fieldDefinition.fromFormData(formData[field])
      return acc
    }, {})

    addClass(classObj)

    closed.val = true
  }

  const onDelete = (e) => {
    removeClass(initialData.id)
    closed.val = true
  }

  van.add(
    document.body,
    Modal(
      { closed },
      form(
        { id: "classform", class: "twocolumn modalform" },
        ...["name", "building", "teacher", "room", "start", "end", "color"].map(
          (field) =>
            formInput(
              fieldDefinitions[field],
              fieldDefinitions[field].toFormInput(initialData[field])
            )
        ),

        label("Days"),
        div(
          { class: "span3" },
          ...["monday", "tuesday", "wednesday", "thursday", "friday"].map(
            (field) =>
              formInput(
                fieldDefinitions[field],
                fieldDefinitions[field].toFormInput(initialData[field])
              ).reverse()
          )
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
