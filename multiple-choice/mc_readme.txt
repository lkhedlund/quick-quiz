### HOW TO ADD QUESTIONS AND CHOICES ###

Please note: I generally refer to 'questions' as questions and 'choices' as both answers and options combined.

Exercises are coded as javascript arrays in the same folder.

* Each array is organized as follows:
Curly braces '{}' are followed by three words "question" "answer" "options". A colon ":" after each word is followed by the text you want to include, and a comma ',' is used to separate each item. A final comma ',' before the square closing bracket ']' is not necessary.

* To add a question, for example, you could type the following:
```
{
"question": "What is your name?",
"answer": "King Arthur of Camelot",
"options": "ni,Sir Robin,Sir Galahad"
},
```
"question" is the question you want to ask. "answer" is the answer. "options" are the other possible choices.

* The main script can handle any number of options that are separated by commas. The above could be amended, for example, to contain an extra option `Sir Lancelot` by inserting it like so `ni,Sir Robin,Sir Galahad,Sir Lancelot`.

NB: Do not add the answer to the list of options, or the quiz will print it out twice.

* Any html markup contained within the quotation marks will work. If you wanted to bold a word in the question, for example, you could type `What is your <b>name</b>?`
