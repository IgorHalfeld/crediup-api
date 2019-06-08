const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongoClient');
const { handlerCode400 } = require('../shared/errorHandler');

module.exports = async function (context, req) {
  const { userId } = req.params;

  if (!userId) {
    return handlerCode400('Provide an user id on params');
  }

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const CreditCards = MongoClient.collection('creditCards');

  const body = await CreditCards.aggregate([
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
        holderName: 1,
        number: 1,
        cvv: 1,
        expirationDate: 1,
        creditValue: 1,
        _id: 1,
        user: 1,
        score: 1,
    }}
  ]);
  closeConnectionFn();
  return context.res = { status: 200, body: await body.toArray() };
};