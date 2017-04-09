import React, {Component} from 'react';
import QuizQuestion from './QuizQuestion';
import QuizOption from './QuizOption';
import QuizButton from './QuizButton';

class MultipleChoiceQuiz extends Component {
  render () {
    let options = [];
    this.props.exercises['options'].forEach(function(option) {
      options.push(<QuizOption value={option} key={option}/>);
    });
    let answer = this.props.exercises['answer'];
    options.push(<QuizOption value={answer} key={answer} />);

    let question = this.props.exercises['question'];
    return (
      <div>
        <QuizQuestion question={question} />
        <div className="options">
          {options}
        </div>
        <QuizButton name="Submit" />
      </div>
    );
  }
}

export default MultipleChoiceQuiz;
