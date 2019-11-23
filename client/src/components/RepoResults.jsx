// jshint esversion:6
import React from 'react';
import RepoProfile from './RepoProfile.jsx';

const RepoResults = (props) => {
  return (
    <div>
    {
      props.repos.length ?
      (
        <div>
        <h1>{props.repos[0].ownerName}</h1>
        <img src={props.repos[0].ownerAvatar}/>
        </div>
      )
      :
      (
        null
      )
    }
    {
      props.repos.length ?
      (
        props.repos.map((repo, i) => {
          return (
            <RepoProfile key={i} repoInfo={repo}/>
          );
        })
      )
      :
      (
        null
      )
    }
    </div>
  );
};

export default RepoResults;