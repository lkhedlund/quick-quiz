import React, { Component } from 'react';
import './App.css';
import QuizQuestion from './components/QuizQuestion';
import QuizOption from './components/QuizOption';
import QuizButton from './components/QuizButton';
import EXERCISES from './exercises/exercise_1.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      userChoice: null,
    };
  }
  setChoice(e) {
    let choice = e.target.value;
    this.setState({
      userChoice: choice,
    });
  }
  handleSubmit() {
    var nextQuestion = this.state.questionNumber + 1;
    this.setState({
      questionNumber: nextQuestion,
    });
  }
  render () {
    let currentQuestion = EXERCISES[this.state.questionNumber];
    let options = [];
    currentQuestion.options.forEach(function(option) {
      options.push(<QuizOption value={option} key={option}/>);
    });
    let answer = currentQuestion.answer;
    options.push(<QuizOption value={answer} key={answer} />);
    let question = currentQuestion.question;
    return (
      <div>
        <QuizQuestion question={question} />
        <div className="options" onChange={e => this.setChoice(e)}>
          {options}
        </div>
        <QuizButton name="Submit" onClick={() => this.handleSubmit()}/>
      </div>
    );
  }
}

export default App;
