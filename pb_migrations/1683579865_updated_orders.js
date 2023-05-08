migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // remove
  collection.schema.removeField("zhrkneug")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "erk7qbi0",
    "name": "ressources_names",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zhrkneug",
    "name": "ressources_names",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("erk7qbi0")

  return dao.saveCollection(collection)
})
