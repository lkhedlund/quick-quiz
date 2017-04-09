import React, {Component} from 'react';

class QuizButton extends Component {
  render () {
    return <button onClick={() => this.props.onClick()}>{this.props.name}</button>;
  }
}

export default QuizButton;
