import React from 'react';
import './index.css';

class Homescreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    alert('Warning: You must be at least 21 to play this game, please get drunk responsibly!');
  }

  render() {
    return (
      <div id='wrapper'>
        <button className='button' onClick={this.props.newScreen}>
        <h4>GET SPONKED.</h4>
          <ion-icon style={{fontSize: 48}} name="beer"></ion-icon>
        </button>

      </div>
    )
  }
}
export default Homescreen;
