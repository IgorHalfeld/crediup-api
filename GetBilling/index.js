const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongoClient');
const { handlerCode400 } = require('../shared/errorHandler');

module.exports = async function (context, req) {
  const { userId } = req.params;

  if (!userId) {
    return handlerCode400('Provide an user id on params')
  }

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const Billing = MongoClient.collection('billing');

  const body = await Billing.aggregate([
    { $match: {
      userId: ObjectID(userId),
    }},
    { $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user',
    }},
    { $unwind: '$user' },
    { $project: {
        createdAt: 1,
        seller: 1,
        _id: 1,
        user: 1,
    }}
  ]);
  closeConnectionFn();
  return context.res = { status: 200, body: await body.toArray() };
};