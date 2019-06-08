const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongoClient');
const errorHandler = require('../shared/errorHandler');

const handlerCode400 = errorHandler(400);

module.exports = async function (context, req) {
  const { id } = req.params;

  if (!id) {
    return handlerCode400('Provide an user id on query')
  }

  const { client: MongoClient } = await createMongoClient();
  const User = MongoClient.collection('users');
  const body = await User.findOne({ _id: ObjectID(id) });

  context.res = { status: 200, body };
};