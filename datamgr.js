import dexie from 'dexie'
import dexieCloud from 'dexieCloud'

const db = new dexie("classk", {
    addons: [dexieCloud]
})

db.version(1).stores({
    class: '@id,name,start,end,days',
    task: '@id,classid,type,duedate,title',
    exam: '@id,classid,name,examdate',
    holiday: '@id,name,start,end',
    todo: '@id,name,duedate,type'
})

db.cloud.configure({
    databaseUrl: "https://zafllf6p2.dexie.cloud",
    requireAuth: true
})

db.open()
.then(() => {
    console.log("database opened")
})
.catch((e) => {
    console.log("Database open failed.")
    console.log(e)
})