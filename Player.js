class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    const currentBuyIn = gameState["current_buy_in"];
    const minimumRaiseAmount = gameState["minimum_raise"];
    const moreRiskRaiseAmount = minimumRaiseAmount * 1.5;

    const playerId = gameState["in_action"];
    const currentPlayer = gameState["players"][playerId];
    const currentHand = currentPlayer["hole_cards"];

    const communityCards = gameState.community_cards;

    const highCards = ["A", "K", "Q", "J"];
    const mediumCards = ["8", "9", "10"];

    const riskLevel = {
      check: 0,
      call: 1,
      raise: 2,
      moreRisk: 3,
      allIn: 10
    };
    let currentRiskLevel = riskLevel.check;

    let betAmount = 0;

    let currentRound = 1;

    if(communityCards.length === 3){
      currentRound = 2;
    } else if(communityCards.length === 4){
      currentRound = 3;
    } else if(communityCards.length === 5){
      currentRound = 4;
    }

    if(currentHand[0].rank === currentHand[1].rank){
      currentRiskLevel = riskLevel.call; 
      
      if(highCards.includes(currentHand[0].rank)){
        currentRiskLevel = riskLevel.raise;

        if(currentRound === 3){
          currentRiskLevel = riskLevel.allIn;
        }
      } else if(mediumCards.includes(currentHand[0].rank)){
        currentRiskLevel = riskLevel.call;

        if(currentRound === 3){
          currentRiskLevel = riskLevel.raise;
        }
      }
    }
    if((currentHand[0].rank === "A" && currentHand[1].rank === "K") || (currentHand[0].rank === "K" &&  currentHand[1].rank === "A")){
      currentRiskLevel = riskLevel.call;
    }
    if((currentHand[0].rank === "A" && currentHand[1].rank === "Q") || (currentHand[0].rank === "Q" &&  currentHand[1].rank === "A")){
      currentRiskLevel = riskLevel.call;
    }
    if((currentHand[0].rank === "A" && currentHand[1].rank === "J") || (currentHand[0].rank === "J" &&  currentHand[1].rank === "A")){
      currentRiskLevel = riskLevel.call;
    }
    if((currentHand[0].rank === "K" && currentHand[1].rank === "Q") || (currentHand[0].rank === "Q" &&  currentHand[1].rank === "K")){
      currentRiskLevel = riskLevel.call;
    }

    switch(currentRiskLevel){
      case riskLevel.check:
        if(currentBuyIn > currentPlayer["bet"]){

        }
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
