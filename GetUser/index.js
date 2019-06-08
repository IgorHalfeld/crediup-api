const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
  const { client: MongoClient } = await createMongoClient();
  const User = MongoClient.collection('users');
  const res = await User.find({});
  const body = await res.toArray();
  context.res = { status: 200, body };
};