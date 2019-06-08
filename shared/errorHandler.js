const handler = code => message => ({
  status: code,
  message,
})

exports.errorHandler = handler;
exports.handlerCode400 = handler(400);