migrate((db) => {
  const collection = new Collection({
    "id": "12ifoiieou23lul",
    "created": "2023-04-13 22:33:38.545Z",
    "updated": "2023-04-13 22:33:38.545Z",
    "name": "supply",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "f67mlqa9",
        "name": "supply_name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "inl6ocnj",
        "name": "supply_price",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "0p9uxhwc",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "rlebxgfl",
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
  const collection = dao.findCollectionByNameOrId("12ifoiieou23lul");

  return dao.deleteCollection(collection);
})
