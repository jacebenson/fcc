import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import '../styles/App.css';
import List from './List';
import axios from 'axios';

//class App extends Component {
export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      recent: [],
      alltime: [],
      currentView: 'recent'
    };
  }

  componentWillMount(){
    axios.all([this.getRecent(), this.getAllTime()])
    .then(axios.spread((recent, alltime) => {
      this.setState({
        recent: recent.data, 
        alltime: alltime.data,
      });
      console.log(this.state);
    }));
  }
  getRecent(){
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }
  getAllTime(){
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
  }

  changeView(currentView) {
    this.setState({currentView});
  }


  render() {
    return (
      <div className="container-fluid fill">
      <div className="row">
        <div className="col-sm-3">
          <div className="container">
            <div className="row">INSERT COIN</div>
            <div className="row">LIVES: 0</div>
          </div>
        </div>
        <div className="col-sm-6 screen">
          <div className="title row">
            <div className="position col-sm-3">Rank</div>
            <div className="name col-sm-6">Player</div>
            <div className="points col-sm-3">Score</div>
          </div>
        </div>
        <div className="col-sm-3">
        <div className="container">
          <div className="row clicker">
            <div id="campersRecent" onClick={() => this.changeView('recent')}>
              <img className={this.state.currentView == 'recent' ? 'App-logo' : 'App-logo invisible'} src={logo} />
              RECENT
            </div>
          </div>
          <div className="row clicker">
            <div id="campersAllTime" onClick={() => this.changeView('alltime')}>
              <img className={this.state.currentView == 'alltime' ? 'App-logo' : 'App-logo invisible'} src={logo} />
              ALLTIME
            </div>
          </div>
        </div>
        </div>
      </div>
      <List 
        campers={this.state[this.state.currentView]}
        currentView={this.state.currentView}
      />
    </div>
    );
  }
}