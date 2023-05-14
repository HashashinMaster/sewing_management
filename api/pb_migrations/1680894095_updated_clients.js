migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ecjehvrx8hcfxoi")

  collection.listRule = ""
  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ecjehvrx8hcfxoi")

  collection.listRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
