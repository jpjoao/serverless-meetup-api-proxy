const meetup = require('../services/meetup');

module.exports.handler = (event, context, callback) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };

  const meetupEvents = meetup(event.queryStringParameters, event.httpMethod);

  Promise.all([meetupEvents])
    .then(values => {
      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify(values[0].data),
      });
    })
    .catch(error => {
      callback(null, {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: true,
          message: error,
        }),
      });
    });
};
