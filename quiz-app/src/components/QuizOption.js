import React, {Component} from 'react';

class QuizOption extends Component {
  render () {
    return (
      <label>
        <input type="radio" name="choice" value={this.props.value}/>
        {this.props.value}
      </label>
    );
  }
}

export default QuizOption;
