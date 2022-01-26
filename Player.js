class Player {
  static get VERSION() {
    return '0.1';
  }

  static highCardsOnTable(highCards, currentHand, communityCards) {
    let numberOfCardsOnTable = 0;

    for(let i = 0; i < currentHand.length; i++){
      const currentCard = currentHand[i];
      let currentCardOnTable = 0;

      for(let z = 0; z < communityCards.length; z++){
        const currentCommunityCard = communityCards[z];
        if(currentCard.rank === currentCommunityCard.rank && currentCard.suit === currentCommunityCard.suit && highCards.includes(currentCard.rank)){
          currentCardOnTable++;
        }
      }
      numberOfCardsOnTable = currentCardOnTable > numberOfCardsOnTable ? currentCardOnTable: numberOfCardsOnTable;
    }
    return numberOfCardsOnTable;
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

    let playersInGame = 0;

    for(let p = 0; p < gameState["players"].length; p++){
      if(gameState["players"][0]["status"] === "active"){
        playersInGame++;
      }
    }

    const highCardsOnTable = this.highCardsOnTable(highCards, currentHand, communityCards);

    const riskLevel = {
      check: 0,
      call: 1,
      raise: 2,
      moreRisk: 3,
      allIn: 10
    };
    let currentRiskLevel = riskLevel.check;

    let betAmount = 0;

    let currentBettingRound = 1;

    if(communityCards.length === 3){
      currentBettingRound = 2;
    } else if(communityCards.length === 4){
      currentBettingRound = 3;
    } else if(communityCards.length === 5){
      currentBettingRound = 4;
    }

    if(playersInGame <= 3){
      if(highCards.includes(currentHand[0].rank)){
        currentRiskLevel = riskLevel.call;        
      }

      if(highCardsOnTable > 0){
        currentRiskLevel = riskLevel.raise;
      }

      if(currentHand[0].rank === currentHand[1].rank){
        currentRiskLevel = riskLevel.call;         

        if(highCardsOnTable > 0 ){
          currentRiskLevel = riskLevel.allIn;
        }
      }
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
