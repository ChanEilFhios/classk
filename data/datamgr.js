import {Dexie} from 'dexie'
const db = new Dexie('Classk')
const entities = []
const versions = {
    1: {
        schemas:{},
        updgradeFns: []
    }
}

// db.version(1).stores({
//   tasks: iDBShape
// })
// db.version(version).stores(Object.entries(entities[version]).reduce((schemas, [name, entity]) => {
//     schemas[name] = entity.schema
// }), {})
// db.open()
// .then((result) => {
// })
// .catch((e) => console.log(`Error opening Dexie: ${e}`))

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

export const registerEntity = entity => {
    entities.push(newEntity)
    newEntity.getSchemas().forEach(({versionNum, schema, upgradeFn}) => {
        if (!versions[versionNum]) versions[versionNum] = {schemas: {}, upgradeFns: []}
        versions[versionNum].schemas[newEntity.name] = schema
        if (upgradeFn) versions[versionNum].upgradeFns.push(upgradeFn)
    })
}

export const startDataMgr = () => {
    Object.keys(versions).forEach((versionNum) => {
        const versionData = versions[versionNum]
        const dbVersion = db.version(versionNum).stores(versionData.schemas)

        if (versionData.upgradeFns.length > 0) dbVersion.upgrade((trans) => {
            versionData.upgradeFns.forEach((fn) => {
                fn(trans)
            })
        })

    })

    //Listen for the database to open
    db.on('ready', () => {
        entities.forEach((entity) => {
            entity.setTable(db.table(entity.name))
        })
    })
}