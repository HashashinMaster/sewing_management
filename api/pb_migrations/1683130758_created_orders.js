migrate((db) => {
  const collection = new Collection({
    "id": "m37x1cgs4zbssep",
    "created": "2023-05-03 16:19:15.394Z",
    "updated": "2023-05-03 16:19:15.394Z",
    "name": "orders",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      },
      {
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
      },
      {
        "system": false,
        "id": "q1vgjhcl",
        "name": "price_per_unit",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "hudxkncm",
        "name": "quantity",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("m37x1cgs4zbssep");

  return dao.deleteCollection(collection);
})
