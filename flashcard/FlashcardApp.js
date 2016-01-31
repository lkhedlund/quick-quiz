/*
TITLE: Flashcard Module
AUTHOR: Lars Hedlund
MAIN FEATURES:
(1) Randomly load words or phrases from a list.
(2) User can flip the 'card' by clicking on a selectable div container (#card)
(3) User can skip or randomly move through cards at their own pace.
(4) Card will load 'indefinitely', including repeats.
BUGS: None known

VERSION: 1.4
*/

$(function() {

  // The filename and path of cards.js (only used if cards fails to load)
  var CARDS_LOCATION = 'cards.js';

  try {
    // Attempt to start the app, assuming everything has been defined properly.
    init();
  } catch (e) {
    if (e instanceof ReferenceError) {
      // Fallback if hmtl file is missing script tag
      $.getScript(CARDS_LOCATION, function() {
        init();
      });
      $('body').append(e + ". The cards file may be missing or invalid.")
    } else {
      throw e;
    }
  }

  function init() {
    /*
    The clone action allows the user to loop through one random set of cards before starting over.
    */
    clonedCards = cloneCards();
    loadCard();
  }

  function cloneCards() {
    /* Creates a copy of the cards so that the user gets one of each card
    before starting over. */
    return JSON.parse(JSON.stringify(cards));
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
    var displayCard = $('#flashcard');

    // Selects a random question
    if (clonedCards.length === 0) {
      refill();
    }
    function refill() {
      clonedCards = cloneCards();
    }
    currentCard = clonedCards.splice(Math.floor(Math.random() * clonedCards.length), 1)[0];

    // Loads a new question
    displayCard.html(currentCard["question"]);
    displayCard.attr('value','question');
  }

  function flipCard(idValue) {
    /* Flip the card over to show the answer and/or reshow the question.
    Only changes once the user chooses next.
    */

    // Change these variables if you change the div ids
    var displayCard = $('#flashcard'),
        cardValue = displayCard.attr('value');

    // Start of button logic checks.
    if (idValue === 'flip') {
        if (cardValue === 'question') {
            // Load side
            displayCard.html(currentCard["answer"]);
            displayCard.attr('value','answer');
        } else {
            // Load side
            displayCard.html(currentCard["question"]);
            displayCard.attr('value','question');
        }
    }
    if (idValue === 'next') {
        // Next is the only other option, so pull a new card.
        loadCard();
    }
  }

  // When a user clicks on the button, grab the id and complete the action
  $('button').on('click', function() {
    flipCard(this.id);
  });

});
