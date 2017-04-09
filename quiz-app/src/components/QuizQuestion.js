import React, {Component} from 'react';

class QuizQuestion extends Component {
  render () {
    return <h3>{this.props.question}</h3>;
  }
}

export default QuizQuestion;
