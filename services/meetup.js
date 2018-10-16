const axios = require('axios');
require('dotenv').config({ path: './variables.env' });

const parser = params => {
  const paramsObject = params;
  const { group, endpoint } = params;

  delete paramsObject.group;
  delete paramsObject.endpoint;

  const queryString = Object.keys(paramsObject)
    .map(key => `${key}=${paramsObject[key]}`)
    .join('&');

  return `https://api.meetup.com/${group}/${endpoint}?&${queryString}&key=${
    process.env.MEETUP_API_KEY
  }&sign=true`;
};

const meetup = (querystrings, method) => {
  const validEndpointsSeparatedByCommas = process.env.VALID_ENDPOINTS;
  const splitEndpoints = validEndpointsSeparatedByCommas.split(',');
  const validGroupsSeparatedByCommas = process.env.VALID_MEETUP_GROUPS
  const splitGroups = validGroupsSeparatedByCommas.split(',');;

  if (
    splitGroups.indexOf(querystrings.group) >= 0 &&
    splitEndpoints.indexOf(querystrings.endpoint) >= 0
  ) {
    return axios[method.toLowerCase()](parser(querystrings)).catch(error =>
      Promise.reject(
        error.response.data.errors
          ? error.response.data.errors
          : 'Meetup API error'
      )
    );
  }

  return Promise.reject('Invalid querystrings');
};

module.exports = meetup;
