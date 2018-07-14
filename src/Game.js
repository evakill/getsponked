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

    var socket = io('localhost:1337');
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
        <div className="title-big">SPONK</div>
        <div id="wheel">
          <div id="inner-wheel">
            <div className="sec"><span className="fa fa-user"></span></div>
            <div className="sec"><i className="fa fa-globe"></i></div>
            <div className="sec"><i className="fa fa-trophy"></i></div>
            <div className="sec"><i className="fa fa-user"></i></div>
            <div className="sec"><i className="fa fa-globe"></i></div>
            <div className="sec"><i className="fa fa-trophy"></i></div>
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
        {name: 'Musical Chairs', instructions: 'Move your chair out of the way and the chair of the person to your left and play a song. You control when you want it to pause!'},
        {name: 'Sip sip shot', instructions: 'Like duck duck goose, but with alcohol! Everyone you tell to "sip" sips their drink. If the person you name "shot" tags you before you make it back to their chair, you take the shot'},
        {name: 'Down Up', instructions: 'Everyone look down, on the count of three look up at a random person. If you make eye contact, you both drink.'},
        {name: 'Never Have I Ever', instructions: 'You know the rules. Losers finish their drink.'},
        {name: 'Straight Face', instructions: 'First one to laugh or smile finishes their drink.'},
        {name: 'NINJA', instructions:'EVERYONE BUST OUT INTO NINJA NOW!!! Winner gives out three sips! If you don\'t want to play, drink up.'},
      ],
      individual: [
        {name: 'Accents', instructions: `You must speak with a ${props.country} accent for the next round!`},
        {name: 'Phone Home', instructions: `Let ${props.player1} phone the top number in your recent calls or take a drink.`},
        {name: 'Question Master', instructions: 'You are the question master! Anyone who answers your questions needs to drink.'},
        {name: 'Mute', instructions: 'Whoever you pick isn\'t allowed to speak for one round.'},
        {name: 'Buddy System', instructions: 'Pick someone as your buddy, and they must drink whenever you drink for one round.'},
        {name: 'Truth or Dare', instructions: 'Drink if you don\'t want to answer the question or do the dare the group gives you.'},
        {name: 'Blind', instructions: 'You\'re blind! Keep your eyes shut for one round. Peek and you drink!'},
        {name: 'Twinsies', instructions: 'Pick a random player and drink as much as you want, they must drink the same amount.'}
      ],
      challenge: [
        {name: 'Drank Derby', instructions: `Make ${props.player1} and ${props.player2} finish their drink. Bet on one of them against someone else, and the loser also drinks.`},
        {name: 'Bottoms Up', instructions: `Make either ${props.player1} or ${props.player2} finish their drink.`},
        {name: 'War of Thumbs', instructions: `You and ${props.player1} will have a thumb war.`},
        {name: 'Slaps', instructions: `Play slaps with ${props.player1}. Best two out of three. Loser drinks.`},
        {name: 'Strip or Sip', instructions: `${props.player1} and ${props.player2} must take off their shirts, or take a drink.`},
        {name: 'Staring Contest', instructions: `Get in a staring contest with ${props.player1}. Loser drinks.`},
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
        name = "Group Task: " + this.state.group[i].name;
        taskAtHand = this.state.group[i].instructions;
      } else if((this.props.degree >= 90 && this.props.degree < 150) || (this.props.degree >= 270 && this.props.degree < 330)){
        var i = Math.floor(Math.random() * this.state.individual.length);
        name = "Individual Task: " + this.state.individual[i].name;
        taskAtHand = this.state.individual[i].instructions;
      } else {
        var i = Math.floor(Math.random() * this.state.challenge.length);
        name = "Challenge Task: " + this.state.challenge[i].name;
        taskAtHand = this.state.challenge[i].instructions;
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
