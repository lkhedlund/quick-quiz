import React, { Component } from 'react';
import MultipleChoiceQuiz from './components/MultipleChoiceQuiz.js';
import EXERCISES from './exercises/exercise_1.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MultipleChoiceQuiz exercises={EXERCISES[0]} />
      </div>
    );
  }
}

export default App;
