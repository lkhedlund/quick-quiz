import React, {Component} from 'react';

class QuizButton extends Component {
  render () {
    return <button>{this.props.name}</button>;
  }
}

export default QuizButton;
