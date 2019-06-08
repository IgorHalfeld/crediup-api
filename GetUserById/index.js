const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongoClient');
const { handlerCode400 } = require('../shared/errorHandler');

module.exports = async function (context, req) {
  const { id } = req.params;

  if (!id) {
    return handlerCode400('Provide an user id on params')
  }

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const User = MongoClient.collection('users');
  const body = await User.findOne({ _id: ObjectID(id) });

  closeConnectionFn();
  context.res = { status: 200, body };
};