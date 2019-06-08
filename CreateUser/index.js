const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
  const {
    name,
    email,
    password,
  } = req.body;

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const User = MongoClient.collection('users');

  const {
    result,
    ops,
  } = await User.insert({
    name, email, password,
  });

  closeConnectionFn();
  context.res = { status: 200, body: { result, user: ops[0] } };
};