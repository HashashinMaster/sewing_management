migrate((db) => {
  const collection = new Collection({
    "id": "ucg00sxxgksrkxn",
    "created": "2023-04-17 21:57:54.003Z",
    "updated": "2023-04-17 21:57:54.003Z",
    "name": "models",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "73qesniv",
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
        "id": "pvipzydv",
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
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ucg00sxxgksrkxn");

  return dao.deleteCollection(collection);
})
