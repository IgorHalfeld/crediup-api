const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const User = MongoClient.collection('users');
  const res = await User.find({});
  const body = await res.toArray();
  
  closeConnectionFn();
  context.res = { status: 200, body };
};