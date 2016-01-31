/*
TITLE: Multiple Choice Quiz Module
AUTHOR: Lars Hedlund
MAIN FEATURES:
(1) Load questions from preformatted files.
(2) Submit, Skip, and Restart options.
(3) Displays questions, user answers, and question answers at end of exercise.
(4) Verifies answers and tracks score.

BUGS: (1:Fixed) Special html characters (like &thorn;) could not be checked against the correct answer.
VERSION: 1.4
*/

$(function() {

  // The filename and path of exercises.js (only used if it fails to load)
  var EXERCISES_LOCATION = 'exercises.js';
  // Holds all of the students' answers to be displayed at the end of the quiz.
  var studentAnswers = [];
  // Set the current number and total scores
  var current = 0,
    score = 0;

  try {
    // Attempt to start the app, assuming everything has been defined properly.
    var TOTAL = exercises.length;
    init();
  } catch (e) {
    if (e instanceof ReferenceError) {
      // Fallback if hmtl file is missing script tag with exercises.js
      $.getScript(EXERCISES_LOCATION, function() {
        init();
      });
      $('body').append(e + ". The exercises file may be missing or invalid.")
    } else {
      throw e;
    }
  }


  function init() {
      loadQuestion();
  };

  function loadQuestion() {
      /* METHOD: Loads a random multiple choice question from any array of varying
       length. The array must be organized as an 'associative array', where the
       outer braces [] contain objects {} with key pairs.
       For example:
       var exercises = [
           {"question":"What is your <b>quest</b>?", "options": "blue,the airspeed velocity of an unladen swallow,coconuts", "answer":"to seek the Holy Grail"}];
       where question is the question text, options are multiple choice items that
       are not the answer, and answer is the answer.
      */

      // Change these variables if you change the div ids
      var displayQuestion = $('#question'),
          displayOptions = $('#options');

      var currentExercise = exercises[current];
      // Load the question and question number into the div container
      questionText = (current + 1) + ": " + currentExercise["question"];
      displayQuestion.html(questionText);

      // Randomly displays options and answers from the exercises array.
      var choices = currentExercise["options"].split(',');
      choices.push(currentExercise["answer"]);
      // Clear the container
      displayOptions.html('');
      // Loop through the options and add them to the div container
      while (choices.length != 0) {
          var i = Math.floor(Math.random() * choices.length);
          var writeOption = '<input type="radio" name="choice" value="' + choices[i] + '">';
          displayOptions.append(writeOption + choices[i] + "<br>");
          choices.splice(i, 1);
      }
  }

  function advanceQuestion(idValue) {
      /*
      METHOD: Move the exercise forward through button selection.
      */

      // Change these variables if you change the div ids
      var skip = $('#skip'),
          restart = $('#restart'),
          displayOptions = $('#options'),
          submit = $('#submit');

      // Start of button logic checks.
      if (idValue === 'restart') {
          current = 0;
          score = 0;
          studentAnswers = [];
      }
      if (idValue === 'submit') {
          // Check to see whether or not the answer is correct
          var currentExercise = exercises[current];
          var val = $('input:checked').val();

          /* NOTE: Bug fix for displaying characters. Added the answer to a hidden field to pull &thorn; and &aelig; correctly, or else they are pulled literally (with & and ;) from array. */
          var writeAnswer = '<input type="hidden" id="answer" value="' +    currentExercise["answer"] + '">';
          displayOptions.append(writeAnswer);
          var answer = $('#answer').val();
          //END FIX

          // Validate the user's input to change score
          if (val === answer) {
              score++;
          }
          // Add the answer to the studentAnswers array for tracking
          studentAnswers.push(val);
          // Update current to advance to next question
          current++;
      }
      if (idValue === 'skip') {
          // Add blank to student answers, since the question was skipped
          studentAnswers.push("blank");
          current++;
      }

      // Determine which buttons to show
      if (current === TOTAL) {
          submit.attr('disabled', true);
          skip.attr('disabled', true);
          showScore();
      } else {
          // reset submit and skip if user restarts after final score is shown.
          submit.attr('disabled', false);
          skip.attr('disabled', false);
          loadQuestion();
      }
  }

  function showScore() {
      /* METHOD: Dispays a customized congratulations and the score, followed by each question's text and its answer (along with the user's selection).
      */
      // Change these variables if you change the div ids
      var displayQuestion = $('#question'),
          displayOptions = $('#options');

      // Add your message here
      var congratulations = "<h2>Quiz Breakdown</h2>";
      displayQuestion.html(congratulations);

      // Display the user's final score
      var displayScore = "<h3>Your final score is " + score + " out of " + TOTAL + ".</h3>";
      // Displays the user's choices and the correct answers.
      for (i = 0; i < TOTAL; i++) {
          var currentExercise = exercises[i];
          displayScore += '<p><b>' + (i + 1) + ": " + currentExercise["question"] + '</b> </p>';
          displayScore += "<p>Your answer was " + studentAnswers[i] + '</p>';
          displayScore += "<p>The correct answer is " + currentExercise["answer"] + '</p>';
      }
      displayOptions.html(displayScore);
  };

  // Advance to the next question
  $('button').on('click', function() {
    advanceQuestion(this.id);
  });

});
