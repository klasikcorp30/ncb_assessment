/*
Testing the functions that are used within the game
*/
const { CARDS } = require("../constants");
const {
  getRandomCard,
  sumOfHand,
  isBust,
  isAcePresent,
} = require("../functions");

const dummyHand = [{ A: 1 }, { 2: 2 }, { A: 11 }, { 9: 9 }];

describe("Testing card functions", () => {
  it("should return a card object", () => {
    expect(getRandomCard(CARDS)).toBeInstanceOf(Object);
  });

  it("should only return one object", () => {
    expect(Object.keys(getRandomCard(CARDS))).toHaveLength(1);
  });

  it("should return a number", () => {
    expect(typeof sumOfHand(dummyHand)).toBe("number");
  });
  it("should detect a bust hand", () => {
    expect(isBust(dummyHand)).toBe(true);
  });

  it("should detect if an ace is present", () => {
    expect(isAcePresent(dummyHand)).toHaveLength(1);
  });
});
