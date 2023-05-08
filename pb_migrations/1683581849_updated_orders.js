migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yilbbjag",
    "name": "supplys",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "eswftit38yxnbpp",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "erk7qbi0",
    "name": "supplys_names",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yilbbjag",
    "name": "ressources",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "eswftit38yxnbpp",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // update
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
})
