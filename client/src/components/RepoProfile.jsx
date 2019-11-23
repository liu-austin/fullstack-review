// jshint esversion:6
import React from 'react';

const RepoProfile = (props) => {
  return (
    <div>
    <h1>{props.repoInfo.repoName}</h1>
    <br/>
    <span>{`DESCRIPTION: ${props.repoInfo.repoDescription}`}</span>
    <br/>
    <span><a href={props.repoInfo.repoUrl}>REPO URL</a></span>
    <br/>
    <span>{`STARS: ${props.repoInfo.stars}`}</span>
    <br/>
    <span>{`CLONE LINK: ${props.repoInfo.cloneUrl}`}</span>
    </div>
  );
};

export default RepoProfile;