import React, { Component } from 'react';
import './index.css';
import Individual from './Individual.js'
import Group from './Group.js'
import io from 'socket.io-client';

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      players: props.players,
      wheel: true,
      degree: 0,
      country: '',
      player1: '',
      player2: ''
    }

    var self = this;

    var socket = io();
    socket.on('connect', function() {
      console.log('Connected to react!');
    });

    socket.on('degree', function(degree) {
      console.log('reactdeg', degree);
      self.setDeg(degree);
      let element = document.getElementById('wheel');
      element.addEventListener('transitionend', function(event) {
        self.toggleWheel();
      })
    });
  }

  componentDidMount() {
    let newPlayers = this.state.players.slice();
    newPlayers.slice(this.state.target, 1)
    const randomNumber1 = Math.floor(Math.random() * newPlayers.length);
    const player1 = newPlayers[randomNumber1];
    newPlayers.splice(randomNumber1, 1);
    const randomNumber2 = Math.floor(Math.random() * newPlayers.length);
    const player2 = newPlayers[randomNumber2];
    newPlayers.splice(randomNumber2, 1);

    const countries = ['British', 'Southern', 'Jamaican', 'Indian', 'Mexican', 'Chinese', 'Italian', 'German', 'Boston', 'Pirate'];
    const country = countries[Math.floor(Math.random() * 10)];

    this.setState({ player1: player1, player2: player2, country: country });
  }

  setDeg(degree) {
    this.setState({degree: degree});
  }

  toggleWheel(){
      this.setState({wheel: false});
  }

  render() {
    console.log(this.state.degree)
    return (
      (this.state.wheel) ?
      <Wheel></Wheel> :
      <Task done={()=>this.setState({wheel:true})} degree={this.state.degree} players={this.state.players}
        player1={this.state.player1} player2={this.state.player2} country={this.state.country}></Task>
    )
  }
}

class Wheel extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div id="wrapper">
        <div id="wheel">
          <div id="inner-wheel">
            <div className="sec"><span className="fa fa-user"></span></div>
            <div className="sec"><i className="fa fa-globe"></i></div>
            <div className="sec"><i className="fa fa-users"></i></div>
            <div className="sec"><i className="fa fa-user"></i></div>
            <div className="sec"><i className="fa fa-globe"></i></div>
            <div className="sec"><i className="fa fa-users"></i></div>
          </div>
          <div  id="spin">
            <div id="inner-spin"></div>
          </div>
          <div id="shine"></div>
        </div>
        <div id="txt"></div>
      </div>
    );
  }
}

class Task extends Component {
  constructor(props){
    super(props);
    this.state = {
      group: [
        {name: 'Double Trouble', instructions: 'Pick someone for your pair, they must drink whenever you drink for one round.'},
        {name: 'Musical Chairs', instructions: 'Move your chair out of the way and the chair of the person to your left and play a song. You control when you want it to pause!'},
        {name: 'Sip sip shot', instructions: 'Like duck duck goose, but with alcohol! Everyone you tell to "sip" sips their drink. If the person you name "shot" tags you before you make it back to their chair, you take the shot'},
        {name: 'Down Up', instructions: 'Everyone look down, on the count of three look up at a random person. If you make eye contact, you both drink.'},
        {name: 'Never Have I Ever', instructions: 'You know the rules. Losers finish their drink.'},
        {name: 'Straight Face', instructions: 'First one to laugh or smile finishes their drink.'},
      ],
      duel: [
        {instructions: `You must speak with a ${props.country} accent for the next 2 rounds!`},
        {instructions: `You must let ${props.player1} call the top number of a friend/family member in your Recents!`},
        {instructions: `Make either ${props.player1} or ${props.player2} finish their drinks.`},
        {instructions: 'You are the question master! Anyone who answers your questions needs to drink.'},
        {instructions: 'Whoever you pick isn\'t allowed to speak for one round.'},
        {instructions: 'Pick someone for your pair, they must drink whenever you drink for one round.'},
        {instructions: 'Truth or dare! Drink if you don\'t want to answer the question or do the dare the group gives you.'},
        {instructions: 'Blind! Keep your eyes shut for one round!'},
        {instructions: 'Pick a random player and drink as much as you want, they must drink the same amount.'}
      ],
      some: [
        {instructions: `Make ${props.player1} and ${props.player2} finish their drinks. Bet on one of them against someone else.`},
        {instructions: `You must let ${props.player1} call the top number of a friend/family member in your Recents!`},
        {instructions:'Whoever you pick isn\'t allowed to speak for one round.'},
        {instructions:'Pick a random player and drink as much as you want, they must drink the same amount.'},
        {instructions: `War of the thumbs! You and ${props.player1} will have a thumb war.`},
        {instructions: `Get in a staring contest with ${props.player1}.`},
        {instructions:'NINJA! EVERYONE BUST OUT INTO NINJA NOW!!! Winner gives out three sips! If you don\'t want to play you must drink!'},
        {instructions: `Play slaps with ${props.player1}, best two out of three.`},
        {instructions: `${props.player1} and ${props.player2} need to take their shirts off. People vote on who drink.`}
      ],
      players: props.players,
      taskAtHand: '',
      country: ''
    }
  }

  render() {
    const styles = {
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6699ff',
      }
    }
    let taskAtHand = 'intructions';
    let name = 'task'
    console.log(this.props.degree);
      if((this.props.degree >= 30 && this.props.degree < 90) || (this.props.degree >= 210 && this.props.degree < 270)){
        var i = Math.floor(Math.random() * this.state.group.length);
        name = this.state.group[i].name;
        taskAtHand = this.state.group[i].instructions;
      } else if((this.props.degree >= 90 && this.props.degree < 150) || (this.props.degree >= 270 && this.props.degree < 330)){
        console.log(this.state.duel, Math.floor(Math.random() * this.state.duel.length))
        taskAtHand = this.state.duel[Math.floor(Math.random() * this.state.duel.length)].instructions;
      } else {
        console.log(this.state.some, Math.floor(Math.random() * this.state.some.length))
        taskAtHand = this.state.some[Math.floor(Math.random() * this.state.some.length)].instructions;
      }


    return (<div id='wrapper'>
      <div className="task">
        <div className="task-title">{name}</div>
        {taskAtHand}
      </div>
    <div>
      <button style={{float:'right'}} className="small-button" onClick={()=>this.props.done()}>Done</button>
    </div>
    </div>)
  }


}


export default Game;
