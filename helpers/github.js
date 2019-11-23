const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos?per_page=25`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  function callback(error, response, body) {
    if (error) {
      cb(error);
    } else {
      cb(null, body);
    }
  }

  request(options, callback);

};

module.exports.getReposByUsername = getReposByUsername;