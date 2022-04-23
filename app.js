const { exit } = require("process");
const readline = require("readline");
const {
  getRandomCard,
  hit,
  stand,
  showCards,
  sumOfHand,
  isBust,
  assignCards,
  isAcePresent,
  showResults,
} = require("./functions");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

/*
This is where the game starts
*/

/*This variable is to keep track of the plaer's choice. 
 This will be needed make decisions concering if dealer or player wins*/
var playersChoice = "";
const startGame = () => {
  console.log(`
  ==========================BkaackJack=========================
  Welcome to BlackJack! Try to get as close to 21 as you can without going over!
  Good luck!
  `);
  let playerHand = [];
  let dealerHand = [];

  //Assign cards
  assignCards(playerHand, dealerHand);

  //Show cards
  showCards(playerHand);

  //Check if Ace is present
  let acePresentForPlayer = isAcePresent(playerHand);

  //If player has an Ace, ask if they want to use it as 11 or 1
  if (acePresentForPlayer.length > 0) {
    rl.question("Do you want Ace to be 1 or 11? ", (answer) => {
      if (answer === "11") {
        //Checking criteria with Ace as 1
        checkingCriteria(playerHand, dealerHand, 1);
        playGame(playerHand, dealerHand);
      } else {
        //Checking criteria with Ace as 11
        playerHand = playerHand.filter((card) => Object.keys(card)[0] !== "A");
        playerHand.push({ A: 11 });
        //Running check 2 to see if the new hand is a win
        checkingCriteria(playerHand, dealerHand, 2);
        playGame(playerHand, dealerHand);
      }
    });
  }

  //Ensure Ace is alwsays 11 for the dealer
  dealerHand = dealerHand.filter((card) => Object.keys(card)[0] !== "A");
  dealerHand.push({ A: 11 });

  playGame(playerHand, dealerHand);
  // Tallies the score
};

startGame();

//Functions for the game

function playGame(playerHand, dealerHand) {
  rl.question(`Press {h} to hit or Press {s} to stand: `, (response) => {
    //Set Player's choice
    playersChoice = response;
    switch (response) {
      case "h":
        hit(playerHand, getRandomCard());
        showCards(playerHand);
        checkingCriteria(playerHand, dealerHand);
        playGame(playerHand, dealerHand);
        break;

      case "s":
        console.log("You selected to stand");
        stand(dealerHand);
        checkingCriteria(playerHand, dealerHand);
        playGame(playerHand, dealerHand);
        break;
      default:
        console.log("Please input a valid response, h or s");
        playGame(playerHand, dealerHand);
        break;
    }
  });
}

function checkingCriteria(playerHand, dealerHand, checkOption) {
  switch (checkOption) {
    case 1:
      if (isBust(playerHand)) {
        showCards(playerHand);
        console.log("Bust, Dealer wins!");
        showResults(playerHand, dealerHand);
        // Ask if they want to play again
        replayGame();
      }
      break;
    case 2:
      if (sumOfHand(playerHand) === 21) {
        console.log("Blackjack!! You win!!");
        showResults(playerHand, dealerHand);
        replayGame();
      }
      break;

    case 3:
      if (
        sumOfHand(dealerHand) > sumOfHand(playerHand) &&
        !isBust(dealerHand)
      ) {
        showResults(playerHand, dealerHand);
        console.log("Dealer wins");
        replayGame();
      }
      break;

    default:
      runnAllChecks(playerHand, dealerHand);
      break;
  }
}

function replayGame() {
  rl.question("Play again? (y/n): ", (response) => {
    switch (response) {
      case "y":
        startGame();
        break;
      case "n":
        console.log("Thank you for playing!");
        exit();
      default:
        console.log("Please input a valid response, y or n");
        replayGame();
        break;
    }
  });
}

let runnAllChecks = (playerHand, dealerHand) => {
  /**
   * This checks if the player has a bust hand
   */
  if (isBust(playerHand)) {
    console.log("Bust, Dealer wins!");
    showResults(playerHand, dealerHand);
    replayGame();
  }
  /**
   *This checks if the player has a blackjack hand
   *If so, the player wins
   */
  if (sumOfHand(playerHand) === 21) {
    console.log("Blackjack!! You win!!");
    showResults(playerHand, dealerHand);
    replayGame();
  }
  /**
   * This checks if the dealer has a higher score than the player
   * as well as if the dealer has not busted. If both conditions are met,
   * the dealer wins.
   */
  if (
    sumOfHand(dealerHand) > sumOfHand(playerHand) &&
    !isBust(dealerHand) &&
    sumOfHand(dealerHand) > 17 &&
    playersChoice === "s"
  ) {
    showCards(dealerHand, "Dealer's");
    console.log("Dealer wins!! ");
    showResults(playerHand, dealerHand);
    replayGame();
  }

  /**
   * This checks is similar to the previous check, but this time
   * the player has a higher score than the dealer. If both conditions are met,
   * the player wins.
   */
  if (
    sumOfHand(playerHand) > sumOfHand(dealerHand) &&
    !isBust(playerHand) &&
    sumOfHand(dealerHand) > 17 &&
    playersChoice === "s"
  ) {
    console.log("You win!!");
    showResults(playerHand, dealerHand);
    replayGame();
  }

  //Checks if the dealer hand is a bust
  if (isBust(dealerHand) && playersChoice === "s") {
    console.log("Dealer busts, you win!!");
    showResults(playerHand, dealerHand);
    replayGame();
  }

  //Checks if the dealer has a blackjack hand
  if (sumOfHand(dealerHand) === 21) {
    console.log("Dealer has blackjack, you lose!");
    replayGame();
  }

  //Simple check if player has a higher score than the dealer
  if (
    sumOfHand(playerHand) > sumOfHand(dealerHand) &&
    !isBust(playerHand) &&
    playersChoice === "s"
  ) {
    console.log("You win");
    showResults(playerHand, dealerHand);
    replayGame();
  }
};
