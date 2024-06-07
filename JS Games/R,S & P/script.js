"use strict";

// Prompt the user for their name when the site is opened
// const userName = prompt("What's your name?");

// Update the UI with the user's name
// if (userName) {
//   document.querySelector(".player-name").textContent = userName;
// }

// VARIABLE THAT ACTIVATE THE GAME (EVENT)

const choices = document.querySelectorAll(".alternative");
// We store the elements that have the class .alternative into the choices variable, because will activate the event listener.
const restart = document.querySelector(".restart");
const changeName = document.querySelector(".change-name");

// VARIABLES THAT WILL MANIPULATE THE UI

const resultEl = document.querySelector(".game-result");
// We store the element that has the class .game-result into the resultEl variable, so later we can manipulate the content in the UI dynamically.
const userScoreEl = document.querySelector(".user-score");
// We store the element that has the class .user-score to manipulate the score in the UI later.
const computerScoreEl = document.querySelector(".computer-score");
// We store the element that has the class .computer-score to do the same as with the .user-score class.
const playerNameEl = document.querySelector(".player-name");
// We store the element that has the class .player-name to then later be able to print the name in the score list

let playerScore = 0;
// We create a variable called playerScore and initialize it to 0. Then later we will use this variable and its score to change the UI.
let computerScore = 0;
// We create a variable called computerScore and initialize it to 0. Then later we will use this variable and its score to change the UI.

// VARIABLES TO SAVE SCORE

const saveScore = document.querySelector(".save-score");
const scoreList = document.querySelector(".players-score");

// FUNCTIONS

//We call this function everytime we ask the computer to make a choice, to then return the result to the options array, by clicking in one .alternative class.

const computerPlay = function () {
  const options = ["rock", "paper", "scissors"];
  // options is an array that contains the strings "rock", "paper", and "scissors".
  const randomOption = Math.floor(Math.random() * options.length);
  // randomOption is a variable that stores a random index value between 0 and options.length - 1.
  // Since we use Math.random(), we will get something like 2.1, but with Math.floor(2.1), we make it 2.
  return options[randomOption];
  // return options[randomOption] will return the computer's choice for the game.
  // options[randomOption] is an array indexing operation. It accesses the element in the options array
  // and return a randome number which represents the computer choice, between 0 and 2. It's like calling console.log(options[2]) which is 'scissors'.
};

//This function determines the outcome of the round, updates the scores, and returns a message indicating the result into the UI.

const playRound = function (playerChoice, computerChoice) {
  // This function has two arguments that represent the choices made by the player and the computer.
  if (playerChoice === computerChoice) {
    return "It's a tie!";
    // If both choices are the same, it's a tie.
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")

    // What it's important it's that these names ("rock", "paper", "scissors" actually match the id of the alternative class, which is storage to the choices varuiable
  ) {
    playerScore = playerScore + 1;
    // If the player wins, add one to the playerScore variable.
    userScoreEl.textContent = playerScore;
    // If the player wins, update the element with the .user-score class and display the score in the UI.
    document.querySelector(".user-win").style.display = "inline";
    document.querySelector(".user-lose").style.display = "none";
    document.querySelector(".computer-win").style.display = "none";
    document.querySelector(".computer-lose").style.display = "inline";
    return "You win! " + playerChoice + " beats " + computerChoice;
    // The string is concatenated using + and returned by the playRound function.
  } else {
    computerScore = computerScore + 1;
    // If the computer wins, add one to the computerScore variable.
    computerScoreEl.textContent = computerScore;
    // Update the element with the .computer-score class and display the score in the UI.
    document.querySelector(".user-win").style.display = "none";
    document.querySelector(".user-lose").style.display = "inline";
    document.querySelector(".computer-win").style.display = "inline";
    document.querySelector(".computer-lose").style.display = "none";
    return "You lose! " + computerChoice + " beats " + playerChoice;
  }
};

// FUNCTION TO ADD SCORE

function addScore() {
  const playerName = playerNameEl.textContent;
  const userScore = userScoreEl.textContent;
  const computerScore = computerScoreEl.textContent;

  const scoreDifference = userScore - computerScore;
  const newScoreItem = document.createElement("li");
  newScoreItem.textContent = `${playerName}: ${scoreDifference}`;

  scoreList.appendChild(newScoreItem);
  //appendChild is a method in JavaScript that is used to add a new child node to a specified parent node.
}

// EVENT HANDLERS FOR GAME

choices.forEach(function (choice) {
  // The forEach() method calls a function for each element in an array or NodeList
  // When the user clicks on an element with the .alternative class, the function will be executed.
  // Inside the forEach loop, choice represents the current HTML element being processed.
  // The choice parameter receives the value of the current element in the choices variable, which stores the elements with the .alternative class,
  // which at the same time are saved as the choice parameter.
  // For example, if there are three elements with the class .alternative, the forEach loop will execute the function three times,
  // and each time the choice parameter will refer to one of these elements.
  choice.addEventListener("click", function () {
    //This .addEventListener atacches a click event listener to each choice element.
    // When the element is clicked, the event handler function executes and access to each choice. in which corresponds to the player's choice (e.g. rock, paper, scissors)
    // and execute the playRound function with the player's choise and the random computer's choice.
    const result = playRound(choice.id, computerPlay());
    // We call the playRound function and assign its return value to the result variable.
    // The playRound function is responsible for handling the game logic based on the user's choice (choice.id) and the computer's choice (computerPlay()).
    // choice.id refers to the .id of the HTML element with the .alternative class.
    resultEl.textContent = result;
    // Update the element with the .game-result class to display the result of the round in the UI, using the result variable.
  });
});

// EVENT HANDLERS FOR RESTART

restart.addEventListener("click", function () {
  playerScore = 0;
  // Reset the playerScore variable
  computerScore = 0;
  // Reset the computerScore variable
  document.querySelector(".user-score").textContent = 0; // Update the UI
  document.querySelector(".computer-score").textContent = 0; // Update the UI
  document.querySelector(".game-result").textContent =
    "Rock, Scissors or Paper";
  document.querySelector(".user-win").style.display = "none";
  document.querySelector(".user-lose").style.display = "none";
  document.querySelector(".computer-win").style.display = "none";
  document.querySelector(".computer-lose").style.display = "none";
});

// EVENT HANDLERS FOR CHANGE NAME

changeName.addEventListener("click", function () {
  const newUserName = prompt("What's your name?");
  if (newUserName) {
    document.querySelector(".player-name").textContent = newUserName;
  }
});

// EVENT HANLDER TO SAVE SCORE

saveScore.addEventListener("click", addScore);
