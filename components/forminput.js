import van from "vanjs-core"

const { input, label } = van.tags

export const formInputProperties = (name, id, type, others) => ({
    name,
    id,
    type,
    ...others
})

export default (properties) => [
    label({for: properties.id}, properties.name),
    input(properties)
]
