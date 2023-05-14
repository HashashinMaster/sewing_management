migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dv4mruxw",
    "name": "completed",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // remove
  collection.schema.removeField("dv4mruxw")

  return dao.saveCollection(collection)
})
