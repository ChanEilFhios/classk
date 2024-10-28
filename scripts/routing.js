import {renderPane} from './renderutils.js'

let renderElement
const routes = {}
let notFoundPane

export default (parentElement, homePage, notFoundPage, startingRoutes) => {
    if (!parentElement) {
        throw new Error("No parent element provided.")
    }
    if (!homePage) {
        throw new Error("No home page DOM renderer provided.")
    }

    renderElement = parentElement
    routes["/"] = homePage
    notFoundPane = notFoundPage
    if (startingRoutes) addRoutes(startingRoutes)

    //Handle the back and forward buttons
    window.onload = () => navigate(window.location.pathname)
    window.onpopstate = () => navigate(window.location.pathname)
    
    //Render the current route
    navigate(window.location.pathname)
}

export const addRoutes = (newRoutes) => {
    if (!newRoutes) {
        throw new Error("No routes provided.")
    }

    Object.entries(newRoutes).forEach(([key, value]) => {
        routes[key] = value
    })
}

export const navigate = (url) => {
    if (!url) {
        throw new Error("No URL provided.")
    }

    if (!routes[url]) {
        renderPane(renderElement, notFoundPane)
    }

    renderPane(renderElement, routes[url])
}

export const linkify = (linkElement) => {
    linkElement.addEventListener("click", (e) => {
        e.preventDefault()
        navigate(linkElement.getAttribute("href"))
    })
}