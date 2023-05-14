migrate((db) => {
  const collection = new Collection({
    "id": "9getj2tkvnpuzr2",
    "created": "2023-04-13 18:57:24.671Z",
    "updated": "2023-04-13 18:57:24.671Z",
    "name": "stock",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8jo8hhzh",
        "name": "supply_name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "o0eigi88",
        "name": "supply_type",
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
        "id": "yoeuhhqj",
        "name": "quantity",
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
        "id": "uwlhmvhz",
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
        "id": "ncz762ki",
        "name": "description",
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
  const collection = dao.findCollectionByNameOrId("9getj2tkvnpuzr2");

  return dao.deleteCollection(collection);
})
