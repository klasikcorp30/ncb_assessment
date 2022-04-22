const readline = require("readline");
const {
  getRandomCard,
  hit,
  stand,
  getMyCards,
  sumOfHand,
  isBust,
} = require("./functions");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

//TODO: Start Gameplay
const startGame = () => {
  console.log("Dealing hands");
  let playerHand = [];
  let dealerHand = [];
  let playerScore = 0;
  let dealerScore = 0;

  //Assign cards
  assignCards(playerHand, dealerHand);

  //Get player's cards
  getMyCards(playerHand);

  //Check if Ace is present and if so, ask if they want to be 1 or 11
  //use filter
  let isAcePresent = playerHand.filter((card) => {
    return Object.values(card)[0] === 1;
  });

  if (isAcePresent.length > 0) {
    rl.question("Do you want Ace to be 1 or 11? ", (answer) => {
      if (answer === "1") {
        playerHand["A"] = 1;
        playGame(playerHand, dealerHand);
      } else {
        playerHand["A"] = 11;
        playGame(playerHand, dealerHand);
      }
    });
  }
  playGame(playerHand, dealerHand);
  // Tallies the score
};

startGame();

function playGame(playerHand, dealerHand) {
  rl.question(`Press {h} to hit or Press {s} to stand: `, (response) => {
    switch (response) {
      case "h":
        hit(playerHand, getRandomCard());
        getMyCards(playerHand);
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

function checkingCriteria(playerHand, dealerHand) {
  if (isBust(playerHand)) {
    getMyCards(playerHand);
    console.log("Bust, Dealer wins!");
    // Ask if they want to play again
    replayGame();
  }
  if (sumOfHand(playerHand) === 21) {
    getMyCards(playerHand);
    console.log("Blackjack!! You win!!");
    replayGame();
  }

  if (sumOfHand(dealerHand) > sumOfHand(playerHand) && !isBust(dealerHand)) {
    getMyCards(dealerHand, "Dealer's");
    console.log("Dealer wins, Dealer's hand is: ", sumOfHand(dealerHand));
    replayGame();
  }
}

function replayGame() {
  rl.question("Play again? (y/n): ", (response) => {
    if (response === "y") {
      startGame();
    } else {
      console.log("Thanks for playing!");
      rl.close();
    }
  });
}

function assignCards(playerHand, dealerHand) {
  playerHand.push(getRandomCard());
  dealerHand.push(getRandomCard());
  playerHand.push(getRandomCard());
  dealerHand.push(getRandomCard());
}
//TODO: End Gameplay
