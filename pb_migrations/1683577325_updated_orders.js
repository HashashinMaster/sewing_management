migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oz96pkyf",
    "name": "client_full_name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

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

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // remove
  collection.schema.removeField("oz96pkyf")

  // remove
  collection.schema.removeField("4lprz7om")

  // remove
  collection.schema.removeField("l8h2gayb")

  return dao.saveCollection(collection)
})
