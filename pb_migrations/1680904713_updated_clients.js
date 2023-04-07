migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ecjehvrx8hcfxoi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3eikc6ww",
    "name": "adresse",
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
  const collection = dao.findCollectionByNameOrId("ecjehvrx8hcfxoi")

  // remove
  collection.schema.removeField("3eikc6ww")

  return dao.saveCollection(collection)
})
