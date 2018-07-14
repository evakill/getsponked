import React from 'react';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.players,
      target: '',
      tasks: [
        {instructions: 'Pick someone for your pair, they must drink whenever you drink for one round.'},
        {instructions: 'Musical chairs! Move your chair out of the way and the chair of the person to your left and play a song. You control when you want it to pause!'},
        {instructions: 'Sip sip shot! Like duck duck goose but with alcohol! If the person you give a shot to catches you around the table before you make it back to your chair you take the shot!'},
        {instructions: 'Down Up! Everyone look down, on the count of three look up at a random person, if you make eye contact drink.'},
        {instructions: 'Never have I ever! If you lose finish your drink!'},
        {instructions: 'Everyone make a straight face! First one to laugh or smile finishes their drink!'},
      ],
      taskAtHand: ''
    }
  }

  componentDidMount() {
    const taskAtHand = this.state.tasks[Math.floor(Math.random() * this.state.tasks.length)].instructions;
    console.log(Math.floor(Math.random() * this.state.tasks.length), taskAtHand);
    this.setState({ taskAtHand: taskAtHand });
  }

  render() {
    console.log('group', this.state)
    return (

      <div style={styles.container}>
        {this.state.taskAtHand}
      </div>
    )
  }
}

export default Group;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6699ff',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    divAlign: 'center',
    margin: 10,
  },
  instructions: {
    divAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  divBig: {
    fontSize: 36,
    divAlign: 'center',
    margin: 10,
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: .5,
    marginBottom: 50
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonPurple: {
    backgroundColor: '#a64dff'
  },
  buttonYellow: {
    backgroundColor: '#ffff1a'
  },
  buttonLabel: {
    divAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  namePlate: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    flexGrow: 1
  }
};
