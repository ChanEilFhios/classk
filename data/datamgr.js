import {Dexie} from 'dexie'
 
// db.version(1).stores({
//   tasks: iDBShape
// })

// db.open().then(function(){
//   return db.classes.add({name: "Art", number: Math.random()});
// }).then(function(){
//   return db.classes.where('id').between(2, 3).toArray()
// }).then((classes) => {
//   console.log(classes)
// }).then(() =>{
//   // db.delete()
//   console.log(yay)
// }).catch((e) => console.log(e))

export const initDataMgr = () => {
    const db = new Dexie('Classk')
    const schemas = {}

    return {
        registerEntity: (newEntity, version=1) => {
            const entityName = newEntity.name
            if (!schemas[version]) schemas[version] = {}
            schemas[version][entityName] = newEntity.schema

            newEntity.registerDataMgr(db.table(entityName))
        },
        startDataMgr: (version) => {
            db.version(version).stores(schemas[version])
            db.open().catch((e) => console.log(`Error opening Dexie: ${e}`))
        }
    }
}