import React, { Component } from 'react';
import './index.css';
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
      player2: '',

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
        {name: 'Sip sip shot', instructions: 'Like duck duck goose, but with alcohol! Walk around the circle and tap each player on the head in order, saying either "sip" or "shot". Everyone you tell to "sip" sips their drink. Choose one person to call "shot". This person will then chase you around the table. If they tag you before you get back to their seat and sit down, you lose and take the shot. If you make it back safely, they drink.'},
        {name: 'Down Up', instructions: 'Everyone look down. On the count of three everyone looks up at a random person. If any two players make eye contact, they both drink.'},
        {name: 'Never Have I Ever', instructions: 'You know the rules. Play with as many people as there are people in the group. Losers finish their drink.'},
        {name: 'Straight Face', instructions: 'First one to laugh or smile finishes their drink, starting now!'},
        {name: 'Ninja', instructions:'EVERYONE BUST OUT INTO NINJA NOW!!! Winner gives out three drinks! If you don\'t want to play, drink up.'},
        {name: 'PUMP IT UP', instructions: `Everytime anyone laughs, they MUST fist pump your arms up and down until they're done laughing for two rounds.`},
        {name: 'Headmaster', instructions: 'The person who rolled the wheel counts to three, on three, the last person to have their forehead touching the table drinks!'},
        {name: 'No teeth!', instructions: 'No one can show their teeth for the whole round, even if they laugh, they have to drink!'},
        {name: 'No cursing', instructions: 'For one round if anyone in the group curses they must drink.'},
        {name: 'Get off your phones!', instructions: 'Everyone put their phones on the table, the first one to get notifications drinks.'},
      ],
      individual: [
        {name: 'Accents', instructions: `You must speak with a ${props.country} accent for the next round! Forget and you drink.`},
        {name: 'Question Master', instructions: 'You are the question master! For the next round, if you ask a question and someone answers you, they must drink. However, if they respond with \"Fuck you\" then you have to drink.'},
        {name: 'Mute', instructions: 'Whoever you pick isn\'t allowed to speak for one round.'},
        {name: 'Buddy System', instructions: 'Pick someone as your buddy, and they must drink whenever you drink for one round.'},
        {name: 'Truth or Dare', instructions: 'Commit to a round of truth or dare, or else take a drink.'},
        {name: 'Blind', instructions: 'You\'re blind! Keep your eyes shut for one round. Peek and you drink!'},
        {name: 'American Idol', instructions: 'YOU are the next American Idol! Sing anything that comes out of your mouth this round. Talk normally and you drink!'},
        {name: 'Genesis', instructions: 'You must end each sentence with a fake chapter and verse as if it were a bible quote for one round.'}
      ],
      challenge: [
        {name: 'Bottoms Up', instructions: `${props.player1} and ${props.player2} must finish their drink. Bet on who you think will finish first, and if you lose you also drink.`},
        {name: 'War of the Thumbs', instructions: `You and ${props.player1} will have a thumb war. Loser drinks.`},
        {name: 'Strip or Sip', instructions: `${props.player1} and ${props.player2} must take off their shirts, or take a drink.`},
        {name: 'Staring Contest', instructions: `Get in a staring contest with ${props.player1}. Loser drinks.`},
        {name: 'Phone Home', instructions: `Let ${props.player1} phone the top number in your recent calls, or else you take a drink.`},
        {name: 'Few Word Do Trick', instructions: `You, ${props.player1}, and ${props.player2} can only speak using one syllable words for one word.`}
      ],
      players: props.players,
      taskAtHand: '',
      country: ''
    }
  }

  makeTasks() {
    console.log('hi')
    // this.state.group.forEach(function(item) {
    //   this.state.socket.emit('saveTask', item);
    // })
    this.props.done();
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
    let taskAtHand = 'instructions';
    let name = 'task'
    console.log(this.props.degree);
      if((this.props.degree >= 30 && this.props.degree < 90) || (this.props.degree >= 210 && this.props.degree < 270)){
        var task = this.nextTask(this.state.group.slice());
        var name = "Group Task: " + task.name;
        var instructions = task.instructions;
      } else if((this.props.degree >= 90 && this.props.degree < 150) || (this.props.degree >= 270 && this.props.degree < 330)){
        var task = this.nextTask(this.state.individual.slice());
        var name = "Individual Task: " + task.name;
        var instructions = task.instructions;
      } else {
        var task = this.nextTask(this.state.challenge.slice());
        var name = "Challenge Task: " + task.name;
        var instructions = task.instructions;
      }


    return (<div id='wrapper'>
      <div className="task">
        <div className="task-title">{name}</div>
        {instructions}
      </div>
    <div>
      <button style={{float:'right'}} className="small-button" onClick={()=>this.makeTasks()}>Done</button>
    </div>
    </div>)
  }
}

export default Game;
