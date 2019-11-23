// jshint esversion:6
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoResults from './components/RepoResults.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    // this.search = this.search.bind(this);
    this.get = this.get.bind(this);
  }

  get(username) {
    console.log(`Fetching ${username}`);
    axios.get(`/repos/${username}`)
    .then(data => {
      console.log(data.data);
      this.setState({repos: data.data});
    })
    .catch(err => console.log(err));
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios.post(`/repos`, {
      username: term
    }).then(() => this.get(term))
    .catch(err => console.log(err));
  }

  render () {
    return (<div className='main'>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <RepoResults repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));