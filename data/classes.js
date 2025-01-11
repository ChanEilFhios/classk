import van from "vanjs-core"
import { dataMgr } from "./datamgr.js"

export const updatedLast = van.state(Date.now())
export const schema = '@id,name,start,end,days'

export const getClasses = () => {
    return dataMgr().class.toArray()
    .then((allClasses) => {
        console.log("all classes", allClasses)
        return allClasses.map((aClass) => aClass.name).join("<br/>")
    })
    .then((classlist) => {
        console.log("Classlist", classlist)

        return classlist
    })
}

export const addClass = (newClass) => {
    console.log(newClass)
    dataMgr.class.put(
        {
            name: newClass.Name,
            start: newClass.Start,
            end: newClass.End,
            building: newClass.Building,
            room: newClass.Room,
            teacher: newClass.Teacher,
            days: {
                monday: newClass.Monday,
                tuesday: newClass.Tuesday,
                wednesday: newClass.Wednesday,
                thursday: newClass.Thursday,
                friday: newClass.friday
            }

        }
    )
}