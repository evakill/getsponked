import React, { Component } from 'react';
import './index.css';
import Game from './Game.js'
import Homescreen from './Homescreen.js'
import PlayerScreen from './Playerscreen.js'
// import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      Homescreen: true,
      PlayerScreen: false,
      Game: false,
      players: [],
    }
  }

  render() {
    return (
      (this.state.Homescreen) ?
        <div id="wrapper">
          <Homescreen newScreen={()=>this.setState({Homescreen: false, PlayerScreen: true})}></Homescreen>
        </div> : (this.state.PlayerScreen) ? <div id="wrapper">
          <PlayerScreen start={(players)=>this.setState({PlayerScreen: false, Game: true, players: players})}></PlayerScreen>
        </div> : <div id="wrapper"><Game players={this.state.players}></Game></div>
      )
  }
}

export default App;
