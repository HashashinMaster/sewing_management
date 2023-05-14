migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // update
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l8h2gayb",
    "name": "ressource_names",
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

  return dao.saveCollection(collection)
})
