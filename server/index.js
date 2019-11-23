// jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const github = require('../helpers/github');
const mongooseHelper = require('../database/index');
const Promise = require('bluebird');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github.getReposByUsername(req.body.username, (err, results) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      Promise.all(JSON.parse(results).map(result => {
        let repoInfo = {
          repoId: result.id,
          repoName: result.name,
          repoUrl: result.html_url,
          repoDescription: result.description,
          ownerName: result.owner.login,
          ownerAvatar: result.owner.avatar_url,
          ownerUrl: result.owner.html_url,
          stars: result.stargazers_count,
          cloneUrl: result.clone_url
        };
        return mongooseHelper.save(repoInfo);
    }))
  .then(resArr => res.status(201).send(resArr))
  .catch(error => res.status(400).send(error));
}});
});

app.get('/repos/:username', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  mongooseHelper.get(req.params.username, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(results);
      res.status(200).send(results);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});