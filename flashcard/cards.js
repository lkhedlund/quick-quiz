/*
AUTHOR: Lars Hedlund
### HOW TO ADD Cards ###
Exercises are coded as JavaScript arrays in the same folder.

* Each array is organized as follows:
Curly braces '{}' are followed by two words "question" and "answer". A colon ":" after each word is followed by the text you want to include, and a comma ',' is used to separate each item. A final comma ',' before the square closing bracket ']' is not necessary.

* To add a question, for example, you could type the following:
```
  {
  "question": "What is a pronoun?",
  "answer": "A word that takes the place of a noun.",
  },
```
"question" is the question you want to ask. "answer" is the answer.

* Any html markup contained within the quotation marks will work. If you wanted to bold a word in the question, for example, you could type `What is a <b>pronoun</b>?`
*/

var cards = [

    {
      "question" : "tree<br>adjective or noun?", // <br> starts a new line.
      "answer" : "noun"
    },

    {
      "question" : "<b>Canada</b> is located on which continent?",
      "answer" : "North America"
    },

    {
      "question" : "Kvinnan talar",
      "answer" : "The woman speaks"
    } // <--Note that this is the last question, and there is no need to add ',' after the '}'
];
