const objectPrototype = Object.getPrototypeOf({})

export const handleElementParams = (propsOrChild = undefined, ...childList) => {
  const isProps = Object.getPrototypeOf(propsOrChild) === objectPrototype

  if (!isProps) childList.unshift(propsOrChild)

  return {
    properties: isProps ? propsOrChild : {},
    children: childList,
  }
}

export const getContrastColor = (hex) => {
  const bigint = parseInt(hex.slice(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b

  return luminance > 128 ? "black" : "white"
}
