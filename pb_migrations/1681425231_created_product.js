migrate((db) => {
  const collection = new Collection({
    "id": "y5o0zos10qa2l3u",
    "created": "2023-04-13 22:33:51.215Z",
    "updated": "2023-04-13 22:33:51.215Z",
    "name": "product",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kmxjrcrw",
        "name": "mn_b3d",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("y5o0zos10qa2l3u");

  return dao.deleteCollection(collection);
})
