import React from 'react';
import './index.css';

class PlayerScreen extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     username: '',
     players: []
   }
 }

 press() {
   if (this.state.username) {
     let newPlayers = this.state.players.slice();
     newPlayers.push(this.state.username);
     this.setState({ username: '', players: newPlayers });
   } else {
     alert('Please enter a name');
   }
 }

 render() {
   return (
     <div id="wrapper">
       <div className="title">ADD PLAYERS</div>
       <div>
         <input className="input" type="text" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
         <button className="small-button" onClick={this.press.bind(this)}><i className="fa fa-plus"></i>
         </button>
       </div>
     <div className="list">
       {this.state.players.map((player, index)=><div className="player">Player {index + 1}: {player}</div>)}
     </div>
     <div className="center">
       <button onClick={()=>this.props.start(this.state.players)} className="med-button">
           Start Game
       </button>
     </div>
     </div>
   )
 }
}


export default PlayerScreen;
