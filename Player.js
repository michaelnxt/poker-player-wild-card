class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    const currentBuyIn = gameState["current_buy_in"];
    const minimumRaise = gameState["minimum_raise"];
    const moreRiskRaise = minimumRaise * 2

    const playerId = gameState["in_action"];
    const currentPlayer = gameState["players"][playerId];
    const currentHand = currentPlayer["hole_cards"];

    const highCards = ['A', 'K', 'Q', 'J'];

    let betAmount = 0;

    const risklevel = {
      check = 0,
      call = 1,
      raise = 2,
      moreRisk = 3,
      allIn = 10,
    }

    let activeRiskLevel = risklevel.check;

    switch(currentHand){
      case currentHand[0]["rank"] === "A" &&  currentHand[1]["rank"] === "A":
        activeRiskLevel = risklevel.allIn;
        break;
      case currentHand[0]["rank"] === "K" &&  currentHand[1]["rank"] === "K":
        activeRiskLevel = risklevel.moreRisk;
        break;
      case currentHand[0]["rank"] === "Q" &&  currentHand[1]["rank"] === "Q":
        activeRiskLevel = risklevel.moreRisk;
        break;
      case currentHand[0]["rank"] === "J" &&  currentHand[1]["rank"] === "J":
        activeRiskLevel = risklevel.moreRisk;
        break;
      case (currentHand[0]["rank"] === "A" && currentHand[1]["rank"] === "K") || (currentHand[0]["rank"] === "K" &&  currentHand[1]["rank"] === "A"):
        activeRiskLevel = risklevel.raise;
        break;
      case (currentHand[0]["rank"] === "A" && currentHand[1]["rank"] === "Q") || (currentHand[0]["rank"] === "Q" &&  currentHand[1]["rank"] === "A"):
        activeRiskLevel = risklevel.raise;
        break;
        case (currentHand[0]["rank"] === "A" && currentHand[1]["rank"] === "J") || (currentHand[0]["rank"] === "J" &&  currentHand[1]["rank"] === "A"):
          activeRiskLevel = risklevel.raise;
        break;
      case (currentHand[0]["rank"] === "K" && currentHand[1]["rank"] === "Q") || (currentHand[0]["rank"] === "Q" &&  currentHand[1]["rank"] === "K"):
        activeRiskLevel = risklevel.raise;
        break;
      case currentHand[0]["rank"] === currentHand[1]["rank"]:
          activeRiskLevel = risklevel.raise;
        break;
      case highCards.includes(currentHand[0]["rank"]) || highCards.includes(currentHand[1]["rank"]):
          activeRiskLevel = risklevel.call;
        break;
    }

    switch(activeRiskLevel){
      case activeRiskLevel === risklevel.check:
          betAmount = 0;
        break;
        case activeRiskLevel === risklevel.call:
          betAmount = currentBuyIn - currentPlayer["bet"];
        break;
        case activeRiskLevel === risklevel.raise:
          betAmount = currentBuyIn - currentPlayer["bet"] + minimumRaise;
        break;
        case activeRiskLevel === risklevel.moreRisk:
          betAmount = currentBuyIn - currentPlayer["bet"] + moreRiskRaise;
        break;
        case activeRiskLevel === risklevel.allIn:
          betAmount = currentPlayer["stack"];
        break;
    }

    bet(betAmount);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
