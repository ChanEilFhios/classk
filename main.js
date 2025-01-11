import van from "vanjs-core"
import { todayHdr } from "./panes/today.js"
import { tasksHdr } from "./panes/tasks.js"
import { examHdr } from "./panes/exams.js"
import { vnav } from "./panes/navbar.js"
import { todoHdr } from "./panes/todos.js"
import { classesPane } from "./panes/today.js"

const { div } = van.tags

van.add(document.body, 
    vnav("leftnav"),
    todayHdr("headerleft"),
    tasksHdr("headercenter"),
    examHdr("headerright"),
    classesPane("mainleft"),
    div({class: "maincenter columnborder scrollable"}, "maincenter"),
    div({class: "maintopright columnborder scrollable verticalseparation"}, "maintopright"),
    todoHdr("secondheaderright"),
    div({class: "mainbottomright columnborder scrollable"}, "mainbottomright")
)