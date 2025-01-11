export const handleElementParams = (propsOrChild = undefined, ...childList) => {
    if (propsOrChild instanceof HTMLElement) childList.unshift(propsOrChild)

    return {
        properties: (Object(propsOrChild) === propsOrChild) ? propsOrChild : {},
        children: childList
    }
}