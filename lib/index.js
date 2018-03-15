const { MongoClient } = require('mongodb')

const responses = []
const { MONGO_URL, MONGO_DB } = process.env

const retrieveDataMongo = async url => {
  const connection = await MongoClient.connect(MONGO_URL)
  const db = connection.db(MONGO_DB)
  const collection = db.collection('responses')
  const lastCall = await collection.findOne({ url })
  connection.close()
  return lastCall
}

const retrieveData = async url => {
  if (MONGO_URL && MONGO_DB) {
    return retrieveDataMongo(url)
  }

  return responses[url]
}

const saveDataMongo = async (url, { data, date }) => {
  const connection = await MongoClient.connect(MONGO_URL)
  const db = connection.db(MONGO_DB)
  const collection = await db.collection('responses')
  await collection.remove({ url })
  const lastCall = await collection.insert({ url, data, date })
  connection.close()
  return lastCall
}

const saveData = async (url, data) => {
  if (MONGO_URL && MONGO_DB) {
    return saveDataMongo(url, data)
  }

  responses[url] = data
  return data
}

module.exports = (ms, microFunction) => async (req, res) => {
  const lastCall = await retrieveData(req.url)
  if (lastCall && lastCall.date > new Date()) {
    return lastCall.data
  }
  const data = await microFunction(req, res)
  const date = new Date(new Date().getTime() + ms)
  saveData(req.url, { data, date })
  return data
}
