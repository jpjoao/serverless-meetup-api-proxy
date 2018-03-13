const meetup = require('../services/meetup');

module.exports.handler = (event, context, callback) => {
  const meetupEvents = meetup(event.queryStringParameters, event.httpMethod);

  Promise.all([meetupEvents])
    .then(values => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          data: values[0].data,
        }),
      });
    })
    .catch(error => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: true,
          message: error,
        }),
      });
    });
};
