"use strict";

//VARIABLES

const submit = document.querySelector(".submit-btn");
const wordOing = document.querySelector(".oingLatin");
const inputField = document.querySelector(".input-field");

// FUNCTIONS

const pigLatin = function (word) {
  const vowel = ["a", "e", "i", "o", "u"];
  if (vowel.includes(word[0])) {
    return word + "way";
  } else if (!vowel.includes(word[0]) && vowel.includes(word[1])) {
    return word.slice(1) + word[0] + "ay";
  } else {
    return word.slice(2) + word.slice(0, 2) + "ay";
  }
};

// EVENT HANDLER

submit.addEventListener("click", function () {
  //It's activated when the user click on the submit button and execute the function
  const inputWord = inputField.value;
  //with inputField.value property we can get the current value of the input field.
  if (inputWord) {
    // This conditional statement evaluates to true if inputWord contains a non-empty value.
    const result = pigLatin(inputWord);
    // Get the Pig Latin result
    wordOing.textContent = result;
  } else {
    // If it's a falsy value, because it's empty it will print "Please enter a word!"
    wordOing.textContent = "Please enter a word!";
  }
});
