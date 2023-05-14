migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // remove
  collection.schema.removeField("l8h2gayb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zhrkneug",
    "name": "ressources_names",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l8h2gayb",
    "name": "ressources_names",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "eswftit38yxnbpp",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "supply_name"
      ]
    }
  }))

  // remove
  collection.schema.removeField("zhrkneug")

  return dao.saveCollection(collection)
})
