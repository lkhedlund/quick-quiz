/*
TITLE: Flashcard Module
AUTHOR: Lars Hedlund
MAIN FEATURES:
(1) Randomly load words or phrases from a list.
(2) User can flip the 'card' by clicking on a selectable div container (#card)
(3) User can skip or randomly move through cards at their own pace.
(4) Card will load 'indefinitely', including repeats.
BUGS: None known
VERSION: 1.2
*/

$(function() {

  /* All cards are loaded from a global cards array contained in cards.js.
  The clone action allows the user to loop through one random set of cards before starting over.
  */
  var cloned_cards = cloneCards();

  init();

  function init() {
    loadCard();
  }

  function cloneCards() {
    /* Creates a copy of the cards so that the user gets one of each card
    before starting over. */
    return JSON.parse(JSON.stringify(cards));
  }

  function refresh() {
    // Refreshes div ids that the flashcard is written to
    $('#flashcard').html('');
  }

  function loadCard() {
    /* METHOD: Loads a random flashcard question from any array of varying
     length. The array must be organized as an 'associative array', where the
     outer braces [] contain objects {} with key pairs.
     For example:
     var cards = [
         {"question":"What is the capital of Assyria?", "answer":"Assur"}];
     where question is the question text and answer is the answer. The questions are loaded
     randomly onto the page.
    */

    // Change this if you change the div ids
    var $display_card = $('#flashcard');

    // Refresh content
    refresh();

    // Selects a random question
    if (cloned_cards.length === 0) {
      refill();
    }
    function refill() {
      cloned_cards = cloneCards();
    }
    current_card = cloned_cards.splice(Math.floor(Math.random() * cloned_cards.length), 1)[0];

    // Loads a new question
    $display_card.append(current_card["question"]);
    $display_card.attr('value','question');
  }

  function flipCard(id_value) {
    /* METHOD: Flip the card over to show the answer and/or reshow the question.
    Only changes once the user chooses next.
    */

    // Change these variables if you change the div ids
    var $display_card = $('#flashcard'),
        card_value = $display_card.attr('value');

    // Start of button logic checks.
    if (id_value === 'flip') {
        if (card_value === 'question') {
            // Refresh content
            refresh();
            // Load side
            $display_card.append(current_card["answer"]);
            $display_card.attr('value','answer');
        } else {
            // Refresh content
            refresh();
            // Load side
            $display_card.append(current_card["question"]);
            $display_card.attr('value','question');
        }
    }
    if (id_value === 'next') {
        // Next is the only other option, so pull a new card.
        loadCard();
    }
  }

  // When a user clicks on the button, grab the id and complete the action
  $('button').on('click', function() {
    flipCard(this.id);
  });

});
