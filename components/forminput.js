import van from "vanjs-core"

const { input, label } = van.tags

export default (dataDefinition, initialValue) => {
  const returnElements = []
  const id = Math.random()

  if (dataDefinition.type !== "hidden")
    returnElements.push(label({ for: id }, dataDefinition.label))
  returnElements.push(
    input({
      ...dataDefinition.properties,
      id,
      name: dataDefinition.name,
      type: dataDefinition.type,
      ...initialValue,
    })
  )

  return returnElements
}
