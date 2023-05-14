migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ecjehvrx8hcfxoi")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ecjehvrx8hcfxoi")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
