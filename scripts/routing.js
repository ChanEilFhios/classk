import {renderPane} from './renderutils.js'

let renderElement
const routes = {}

export const addRoutes = (newRoutes) => {
    if (!newRoutes) {
        throw new Error("No routes provided.")
    }

    Object.entries(newRoutes).forEach(([key, value]) => {
        routes[key] = value
    })
}

const handleRoute = () => {
    const hash = window.location.hash.slice(1) || '/'
    console.log("Handling Route:", hash)
    const matchingRoute = routes[hash] || routes["*"]

    if (matchingRoute) {
        renderPane(renderElement, matchingRoute)
    } else console.log("Received unknown route:", hash)
}

export const navigate = (path) => {
    const hash = path ? `#${path}` : ''
    
    window.location.hash = hash
    handleRoute()
}

export const linkify = (linkElement) => {
    linkElement.addEventListener("click", (e) => {
        e.preventDefault()
        navigate(linkElement.getAttribute("href"))
    })
}

export default (parentElement, homePage, notFoundPage, startingRoutes) => {
    if (!parentElement) {
        throw new Error("No parent element provided.")
    }
    if (!homePage) {
        throw new Error("No home page DOM renderer provided.")
    }

    renderElement = parentElement
    routes["/"] = homePage
    routes['*'] = notFoundPage
    if (startingRoutes) addRoutes(startingRoutes)

    window.addEventListener('hashchange', handleRoute);
    
    //Render the current route
    handleRoute()
}