// import React from 'react';
// import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
//
// export class Individual extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       players: [],
//       target: 0,
//       player1: 'someone',
//       player2: 'someone else',
//       tasks: [
//         {'You must speak with a {this.state.country} accent for the next 2 rounds!'},
//         {'You must let {this.state.player1} call the top number of a friend/family member in your Recents!'},
//         {'Make either {this.state.player1} or {this.state.player2} finish their drinks.'},
//         {'Stingpong! Take your shirt off and let everyone through a ping pong ball at you once.'},
//         {'You are the question master! Anyone who answers your questions needs to drink.'},
//         {'Whoever you pick isn\'t allowed to speak for one round.'},
//         {'Pick someone for your pair, they must drink whenever you drink for one round.'},
//         {'Truth or dare! Drink if you don\'t want to answer the question or do the dare the group gives you.'},
//         {'Blind! Keep your eyes shut for one round!'},
//         {'Pick a random player and drink as much as you want, they must drink the same amount.'}
//       ],
//       taskAtHand: '',
//       country: ''
//     }
//   }
//
//   componentDidMount() {
//     let newPlayers = this.state.players.slice();
//     newPlayers.slice(this.state.target, 1)
//     const randomNumber1 = Math.floor(Math.random() * newPlayers.length);
//     const player1 = newPlayers[randomNumber1];
//     newPlayers.splice(randomNumber1, 1);
//     const randomNumber2 = Math.floor(Math.random() * newPlayers.length);
//     const player2 = newPlayers[randomNumber2];
//     newPlayers.splice(randomNumber2, 1);
//
//     const taskAtHand = this.state.tasks[Math.floor(Math.random() * this.state.tasks.length)];
//
//     const countries = ['British', 'Southern', 'Jamaican', 'Indian', 'Mexican', 'Chinese', 'Italian', 'German', 'Boston', 'Pirate'];
//     const country = countries[Math.floor(Math.random() * 10)];
//
//     this.setState({
//       players: newPlayers,
//       player1: player1,
//       player2: player2,
//       taskAtHand: taskAtHand,
//       country: country
//     })
//   }
//
//   render() {
//     return (
//       <div style={styles.container}>
//         {this.state.taskAtHand}
//       </div>
//     )
//   }
//
//
// }
//
// export default Individual;
//
// const styles = {
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#6699ff',
//   },
//   containerFull: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'stretch',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     divAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     divAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   divBig: {
//     fontSize: 36,
//     divAlign: 'center',
//     margin: 10,
//   },
//   button: {
//     alignSelf: 'stretch',
//     paddingTop: 10,
//     paddingBottom: 10,
//     marginTop: 10,
//     marginLeft: 5,
//     marginRight: 5,
//     borderRadius: 5,
//     borderWidth: .5,
//     marginBottom: 50
//   },
//   buttonRed: {
//     backgroundColor: '#FF585B',
//   },
//   buttonBlue: {
//     backgroundColor: '#0074D9',
//   },
//   buttonGreen: {
//     backgroundColor: '#2ECC40'
//   },
//   buttonPurple: {
//     backgroundColor: '#a64dff'
//   },
//   buttonYellow: {
//     backgroundColor: '#ffff1a'
//   },
//   buttonLabel: {
//     divAlign: 'center',
//     fontSize: 16,
//     color: 'white'
//   },
//   namePlate: {
//     paddingTop: 10,
//     paddingBottom: 10,
//     marginTop: 10,
//     marginLeft: 10,
//     marginRight: 10,
//     borderRadius: 5,
//     flexGrow: 1
//   }
// };
