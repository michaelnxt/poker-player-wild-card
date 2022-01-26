class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    const currentBuyIn = gameState["current_buy_in"];
    const minimumRaiseAmount = gameState["minimum_raise"];
    const moreRiskRaiseAmount = minimumRaiseAmount * 2;

    const playerId = gameState["in_action"];
    const currentPlayer = gameState["players"][playerId];
    const currentHand = currentPlayer["hole_cards"];

    const highCards = ["A", "K", "Q", "J"];

    const riskLevel = {
      check: 0,
      call: 1,
      raise: 2,
      moreRisk: 3,
      allIn: 10
    };
    let currentRiskLevel = riskLevel.call;

    let betAmount = currentBuyIn - currentPlayer["bet"];

    if(highCards.includes(currentHand[0].rank) || highCards.includes(currentHand[1].rank)){
      currentRiskLevel = riskLevel.call;
    }
    if(currentHand[0].rank === currentHand[1].rank){
      currentRiskLevel = riskLevel.moreRisk;
      
      if(highCards.includes(currentHand[0].rank)){
        currentRiskLevel = riskLevel.allIn
      }
    }
    if((currentHand[0].rank === "A" && currentHand[1].rank === "K") || (currentHand[0].rank === "K" &&  currentHand[1].rank === "A")){
      currentRiskLevel = riskLevel.raise;
    }
    if((currentHand[0].rank === "A" && currentHand[1].rank === "Q") || (currentHand[0].rank === "Q" &&  currentHand[1].rank === "A")){
      currentRiskLevel = riskLevel.raise;
    }
    if((currentHand[0].rank === "A" && currentHand[1].rank === "J") || (currentHand[0].rank === "J" &&  currentHand[1].rank === "A")){
      currentRiskLevel = riskLevel.raise;
    }
    if((currentHand[0].rank === "K" && currentHand[1].rank === "Q") || (currentHand[0].rank === "Q" &&  currentHand[1].rank === "K")){
      currentRiskLevel = riskLevel.raise;
    }

    switch(currentRiskLevel){
      case riskLevel.check:
        betAmount = 0;
        break;
      case riskLevel.call:
        betAmount = currentBuyIn - currentPlayer["bet"];
        break;
      case riskLevel.raise:
        betAmount = currentBuyIn - currentPlayer["bet"] + minimumRaiseAmount;
        break;
      case riskLevel.moreRisk:
        betAmount = currentBuyIn - currentPlayer["bet"] + moreRiskRaiseAmount;
      break;
      case riskLevel.allIn:
        betAmount = currentPlayer["stack"];
      break;
    }

    bet(betAmount);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
