import dexie from "dexie"
import dexieCloud from "dexieCloud"
import van from "vanjs-core"
import { schema as classesSchema } from "./classes.js"

let dbStatus = van.state("Not opened")

// const db = new dexie("classk", {
//     addons: [dexieCloud],
//   })

const db = new dexie("classk")

db.version(1).stores({
  class: classesSchema,
  //   task: "@id,classid,type,duedate,title",
  //   exam: "@id,classid,name,examdate",
  //   holiday: "@id,name,start,end",
  //   todo: "@id,name,duedate,type",
})

// db.cloud.configure({
//   databaseUrl: "https://zafllf6p2.dexie.cloud",
//   requireAuth: true,
// })

db.open()
  .then(() => {
    console.log("database opened")
    // const cloudStatusObservable = db.cloud.webSocketStatus

    // cloudStatusObservable.subscribe((status) => {
    //   dbStatus.val = status
    //   console.log("cloudStatus", status)
    // })
  })
  .catch((e) => {
    console.log("Database open failed.")
    console.log(e)
  })

export const cloudStatus = () => dbStatus
export const dataMgr = () => db
