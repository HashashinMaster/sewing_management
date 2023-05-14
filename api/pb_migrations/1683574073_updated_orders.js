migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zxcfkjxb",
    "name": "client_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "ecjehvrx8hcfxoi",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4imdm6ov",
    "name": "model_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "ucg00sxxgksrkxn",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zxcfkjxb",
    "name": "client_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "ecjehvrx8hcfxoi",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4imdm6ov",
    "name": "model_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "ucg00sxxgksrkxn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

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
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
