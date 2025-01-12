const objectPrototype = Object.getPrototypeOf({})

export const handleElementParams = (propsOrChild = undefined, ...childList) => {
  const isProps = Object.getPrototypeOf(propsOrChild) === objectPrototype

  if (!isProps) childList.unshift(propsOrChild)

  return {
    properties: isProps ? propsOrChild : {},
    children: childList,
  }
}
