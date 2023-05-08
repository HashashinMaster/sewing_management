migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // remove
  collection.schema.removeField("4lprz7om")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kq3mgcoy",
    "name": "model_name",
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
    "id": "4lprz7om",
    "name": "model_name",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "ucg00sxxgksrkxn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "model_name"
      ]
    }
  }))

  // remove
  collection.schema.removeField("kq3mgcoy")

  return dao.saveCollection(collection)
})
