//Randomly select a card from the deck

const { CARDS } = require("../constants");

const getRandomCard = () => {
  const randomIndex = Math.floor(Math.random() * CARDS.length);
  return CARDS[randomIndex];
};

//This function will be used to assign cards to the player and dealer hands
const hit = (hand, card) => {
  hand.push(card);
};

//This function will be used to calculate the sum of the cards in the hand
const sumOfHand = (hand) => {
  //Use reduce to sum up the values of the cards in the hand
  let sum = hand.reduce((acc, card) => {
    return acc + Object.values(card)[0];
  }, 0);
  return sum;
};

const stand = (dealerHands) => {
  while (sumOfHand(dealerHands) < 17) {
    hit(dealerHands, getRandomCard());
    showCards(dealerHands, "Dealer");
  }
};
//This function will be used to display the cards in the hand
const showCards = (hand, name = "Player") => {
  console.log(name + " Hand: ", hand);
};

//This function is used to get a random card from the deck
const RANDOMCARD = () => getRandomCard(CARDS);

const isBust = (hand) => {
  return sumOfHand(hand) > 21;
};

const assignCards = (playerHand, dealerHand) => {
  playerHand.push(getRandomCard());
  dealerHand.push(getRandomCard());
  playerHand.push(getRandomCard());
  dealerHand.push(getRandomCard());
};

const isAcePresent = (hand) => {
  return hand.filter((card) => {
    return Object.values(card)[0] === 1;
  });
};

module.exports = {
  getRandomCard,
  hit,
  showCards,
  stand,
  RANDOMCARD,
  sumOfHand,
  isBust,
  assignCards,
  isAcePresent,
};
