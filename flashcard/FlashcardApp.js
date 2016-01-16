/*
TITLE: Flashcard Module
AUTHOR: Lars Hedlund
MAIN FEATURES:
(1) Randomly load words or phrases from a list.
(2) User can flip the 'card' by clicking on a selectable div container (#card)
(3) User can skip or randomly move through cards at their own pace.
(4) Card will load 'indefinitely', including repeats.

BUGS: None known
VERSION: 1.0
*/

// Start of the main application
var FlashcardApp = FlashcardApp || {};

FlashcardApp.init = function() {
    // Holds all of the students' answers to be displayed at the end of the quiz.
    var student_answer = [];
    var current = 0;
    FlashcardApp.load_card(current);
};

FlashcardApp.refresh = function() {
    /* METHOD: Refreshes div ids that the flashcard is written to. */
    $('#flashcard').html('');
};

FlashcardApp.load_card = function(current) {
    /* METHOD: Loads a random flashcard question from any array of varying
     length. The array must be organized as an 'associative array', where the
     outer braces [] contain objects {} with key pairs.
     For example:
     var cards = [
         {"question":"What is the capital of Assyria?", "answer":"Assur"}];
     where question is the question text and answer is the answer. The questions are loaded
     randomly onto the page.
    */

    // Change these variables if you change the div ids
    var $display_card = $('#flashcard');

    // Store total card length in a constant
    var TOTAL = cards.length;

    // Refresh content
    FlashcardApp.refresh();

    // Initialize 'last' question at -1 to start with a fresh question.
    // var last = -1;
    // Selects a random question
    // var current = Math.floor(Math.random() * TOTAL);
    // if (current === last) {
    //     current = Math.floor(Math.random() * TOTAL);
    // };
    var current_card = cards[current];
    // Loads a new question
    $display_card.append(current_card["question"]);
    $display_card.attr('value','question');
    // Ensure that the same question does not come up twice in a row.
    // last = current;

    // Wait for user input to move on
    $('button').on('click', function() {
        var id_value = this.id;
        FlashcardApp.flip_card(current, id_value);
    });
};

FlashcardApp.flip_card = function(current, id_value) {
    /* METHOD: Flip the card over to show the answer and/or reshow the question.
    Only changes once the user chooses next.
    INPUT: Button id for easier comparison in if/else statements
    */

    // Change these variables if you change the div ids
    var $display_card = $('#flashcard'),
        current_card = cards[current],
        card_value = $display_card.attr('value');

    // Start of button logic checks.
    if (id_value === 'flip') {
        if (card_value === 'question') {
            // Refresh content
            FlashcardApp.refresh();
            // Load side
            $display_card.append(current_card["answer"]);
            $display_card.attr('value','answer');
        } else {
            // Refresh content
            FlashcardApp.refresh();
            // Load side
            $display_card.append(current_card["question"]);
            $display_card.attr('value','question');
        };
    };
    if (id_value === 'next') {
        // Next is the only other option, so pull a new card.
        FlashcardApp.load_card(current + 1);
    };
};
