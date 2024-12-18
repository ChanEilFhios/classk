import { linkify } from "../scripts/routing.js"
import { openDlg, button, addHandler } from "../scripts/renderutils.js"

export default () => {
    const pageRootEl = document.createElement("ul")
    pageRootEl.classList.add("nav", "flex-column")

   const navLinkEls = [
        {label: "Home", href: "/"},
        {label: "Classes", href: "/classes"},
        {label: "About", href: "/about"},
    ].map(link => {
        const linkEl = document.createElement("a")
        linkEl.classList.add("nav-link")
        linkEl.innerText = link.label
        linkEl.setAttribute("href", link.href)
        linkify(linkEl)

        const liEl = document.createElement("li")
        liEl.classList.add("nav-item")
        liEl.appendChild(linkEl)
        return liEl
    })

    navLinkEls.forEach(el => pageRootEl.appendChild(el))
    pageRootEl.appendChild(addHandler(button('Show Dialog', "primary"), openDlg))

    return pageRootEl
}