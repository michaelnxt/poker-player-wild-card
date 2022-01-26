class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    const currentBuyIn = gameState["current_buy_in"];
    const minimumRaise = gameState["minimum_raise"];
    const moreRiskRaise = minimumRaise * 2;

    const playerId = gameState["in_action"];
    const currentPlayer = gameState["players"][playerId];
    const currentHand = currentPlayer["hole_cards"];

    const highCards = ["A", "K", "Q", "J"]

    const riskLevel = {
      check: 0,
      call: 1,
      raise: 2,
      moreRisk: 3,
      allIn: 10
    };

    let betAmount = 0;

    switch(currentHand){
      case currentHand[0]["rank"] === "A" &&  currentHand[1]["rank"] === "A":
        betAmount = currentPlayer["stack"];
        break;
      case currentHand[0]["rank"] === "K" &&  currentHand[1]["rank"] === "K":
        betAmount = currentBuyIn - currentPlayer["bet"] + moreRiskRaise;
        break;
      case currentHand[0]["rank"] === "Q" &&  currentHand[1]["rank"] === "Q":
        betAmount = currentBuyIn - currentPlayer["bet"] + moreRiskRaise;
        break;
      case currentHand[0]["rank"] === "J" &&  currentHand[1]["rank"] === "J":
        betAmount = currentBuyIn - currentPlayer["bet"] + moreRiskRaise;
        break;
      case (currentHand[0]["rank"] === "A" && currentHand[1]["rank"] === "K") || (currentHand[0]["rank"] === "K" &&  currentHand[1]["rank"] === "A"):
        betAmount = currentBuyIn - currentPlayer["bet"] + minimumRaise;
        break;
      case (currentHand[0]["rank"] === "A" && currentHand[1]["rank"] === "Q") || (currentHand[0]["rank"] === "Q" &&  currentHand[1]["rank"] === "A"):
        betAmount = currentBuyIn - currentPlayer["bet"] + minimumRaise;
        break;
        case (currentHand[0]["rank"] === "A" && currentHand[1]["rank"] === "J") || (currentHand[0]["rank"] === "J" &&  currentHand[1]["rank"] === "A"):
        betAmount = currentBuyIn - currentPlayer["bet"] + minimumRaise;
        break;
      case (currentHand[0]["rank"] === "K" && currentHand[1]["rank"] === "Q") || (currentHand[0]["rank"] === "Q" &&  currentHand[1]["rank"] === "K"):
        betAmount = currentBuyIn - currentPlayer["bet"] + minimumRaise;
        break;
        case currentHand[0]["rank"] === currentHand[1]["rank"]:
        betAmount = currentBuyIn - currentPlayer["bet"] + moreRiskRaise;
        break;
    }

    bet(betAmount);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
