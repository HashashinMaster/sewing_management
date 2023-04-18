migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ucg00sxxgksrkxn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sjm6slqd",
    "name": "model_name",
    "type": "text",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("ucg00sxxgksrkxn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sjm6slqd",
    "name": "modal_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
