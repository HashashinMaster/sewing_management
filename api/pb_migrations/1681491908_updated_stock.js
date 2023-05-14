migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9getj2tkvnpuzr2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3nqlpge0",
    "name": "picture",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9getj2tkvnpuzr2")

  // remove
  collection.schema.removeField("3nqlpge0")

  return dao.saveCollection(collection)
})
