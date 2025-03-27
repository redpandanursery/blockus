class SyncEvent {
  constructor(jsonObj){
    this.syncId = jsonObj.syncId ;
    this.event = jsonObj.event ;
    this.data = jsonObj.data ;

    if (this.event == "claimsquares"){
      this.claimSquares() ;
    } else if (this.event == "finishedturn"){
      this.finishedTurn() ;
    } else if (this.event == "newplayer"){
      this.newPlayer() ;
    } else if (this.event == "message"){
      this.newMessage() ;
    }
  }

  claimSquares(){
    let jData = JSON.parse(this.data) ;
    for(const square of jData.squares){
      game.board.getSquare(square[0],square[1]).setOccupiedColor(jData.color) ;
    }
  }

  finishedTurn(){
    let jData = JSON.parse(this.data) ;
    let currentTurn = jData.playerNumber*1 +1 ;
    if (currentTurn > game.totalPlayers){
      currentTurn = 1 ;
    }

    game.controlPanel.newMessage("<div style='color:"+game.getColorForPlayer(currentTurn)+"'>Player "+currentTurn+"'s turn</div>") ;
    if (currentTurn == game.getPlayerNumber() ){
      game.setMyTurn() ;
    }
  }

  newPlayer(){
    let jData = JSON.parse(this.data) ;
    game.playerJoined(jData.playerNumber) ;

    game.controlPanel.newMessage("<div style='color:"+game.getColorForPlayer(jData.playerNumber)+"'>Player "+jData.playerNumber+" has joined</div>") ;
  }

  newMessage(){
    let jData = JSON.parse(this.data) ;
    game.controlPanel.newMessage(jData.message) ;
  }
}