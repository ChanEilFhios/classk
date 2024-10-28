export const renderPane =
    (parentElement, renderFn) => parentElement.replaceChildren(renderFn())