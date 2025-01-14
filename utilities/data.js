const formGetters = {
  text: (val) => val || "",
  time: (val) => val || "",
  checkbox: (val) => (val === "on" ? "true" : "false"),
  color: (val) => val || undefined,
  hidden: (val) => val,
}

const formSetters = {
  text: (val) => ({ value: val || "" }),
  time: (val) => ({ value: val || "" }),
  checkbox: (val) => ({ checked: val === "true" }),
  color: (val) => ({ value: val || "" }),
  hidden: (val) => ({ value: parseInt(val) || "" }),
}

const getSchemaString = (indexType, name) => {
  switch (indexType) {
    case "primary":
      return `++${name}`
    case "unique":
      return `&${name}`
    case "index":
      return name
    default:
      return undefined
  }
}

export const indexTypes = {
  primary: "primary",
  unique: "unique",
  index: "index",
}

export const dataDefEntry = (
  name,
  label,
  type,
  indexType,
  properties = {}
) => ({
  name,
  schema: getSchemaString(indexType, name),
  label,
  type,
  properties,
  fromFormData: formGetters[type],
  toFormInput: formSetters[type],
})
