// jshint esversion:6
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.connect('mongodb://localhost/fetcher');

let Schema = mongoose.Schema;

let repoSchema = new Schema({
  repoId: Number,
  repoName: String,
  repoUrl: String,
  repoDescription: String,
  ownerName: String,
  ownerAvatar: String,
  ownerUrl: String,
  stars: Number,
  cloneUrl: String
});

let Repo = mongoose.model('Repo', repoSchema);

let get = (username, cb) => {
  Repo.find({ownerName: username}, (err, arr) => {
    if (err) {
      cb(err);
    } else {
      cb(null, arr);
    }
  });
}

let saveAsync = (repoInfo) => {
  return new Promise((resolve, reject) => {

    Repo.find({repoId: repoInfo.repoId}, (error, arr) => {
      if (error) {
        reject(error);
      } else {
        if (!arr.length) {
          Repo.create({repoId: repoInfo.repoId,
            repoName: repoInfo.repoName,
            repoUrl: repoInfo.repoUrl,
            repoDescription: repoInfo.repoDescription,
            ownerName: repoInfo.ownerName,
            ownerAvatar: repoInfo.ownerAvatar,
            ownerUrl: repoInfo.ownerUrl,
            stars: repoInfo.stars,
            cloneUrl: repoInfo.cloneUrl}, (err, res) => {
              if (err) {
                reject(err);
              } else {
                console.log(repoInfo.repoName);
                resolve(res);
              }
            });
        } else {
          resolve(arr);
        }
      }
    });
  });
};

let save = (repoInfo, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  Repo.create({repoId: repoInfo.id,
                repoName: repoInfo.name,
                repoUrl: repoInfo.html_url,
                repoDescription: repoInfo.description,
                ownerName: repoInfo.owner.login,
                ownerAvatar: repoInfo.owner.avatar_url,
                ownerUrl: repoInfo.owner.html_url,
                stars: repoInfo.stargazers_count,
                cloneUrl: repoInfo.clone_url}, (err, res) => {
                  if (err) {
                    cb(err);
                  } else {
                    cb(null, res);
                  }
                });
};

let clear = () => {
  console.log('deleting');
  Repo.deleteMany({}, (err) => {
    if (err) {
      console.log('Can\'t delete.');
    }
  });
};


module.exports.save = saveAsync;
module.exports.get = get;
module.exports.clear = clear;