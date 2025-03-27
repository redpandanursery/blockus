class Game {
  constructor(){
    this.activePiece = null ;
    this.gameId = null ;
    this.playerColor = "rgb(139, 139, 203)" ;
    this.playerNumber = null ;
    this.totalPlayers = 0 ;
    this.myTurn = false ;
    //setup items can't go in constructor because they need the game variable to be complete before running the setup methods
  }

  getPlayerName(){
    return "Player "+this.playerNumber ;
  }

  playerJoined(playerNumber){
    if (playerNumber > this.totalPlayers){
      this.totalPlayers = playerNumber ;
    }
  }

  setMyTurn(isTurn = true){
    if (!isTurn){ //assumes that setting my turn to false means I have just finished my turn
      game.sync.finishedTurn() ;
      this.controlPanel.turnDisplay.hide() ;
      setTimeout(function(){game.grantPiecesForTurn()},800) ;
    } else { //starting my turn
      this.controlPanel.turnDisplay.show() ;
      if (!this.confirmHasASpace()){
        this.playFirstSquare() ;
      }
    }

    this.myTurn = isTurn ;
  }

  confirmHasASpace(){
    for (const square of this.board.squares){
      if (square.isOwnSquare()){
        return true ;
      }
    }
    return false ;
  }


  getGameId(){
    return this.gameId ;
  }

  getPlayerNumber(){
    return this.playerNumber ;
  }

  setGameId(id){
    this.gameId = id ;
  }

  setPlayerNumber(num){
    this.playerNumber = num ;
  }

  runSetup(){

    this.setPlayerColor() ;

    this.sync = new GameSync() ; //public access as game.sync.*
    this.board = new Board() ;
    this.playerList = new PlayerList() ;
    this.goals = new Goals() ;
    this.controlPanel = new ControlPanel() ;
    this.playFirstSquare() ;
    this.playFirstSquare() ;
    this.sync.newPlayer(this.playerNumber) ;

    this.recalculateWinConditions() ;

    $(".piecetext").css("color",this.playerColor) ;

    if (this.playerNumber == "1"){
      this.setMyTurn() ;
    }
  }

  getBoard(){
    return this.board ;
  }

  getPlayerColor(){
    return this.playerColor ;
  }

  setActivePiece(pieceObj = null){
    if (this.activePiece != null && pieceObj != null){ //need to clear the existing active piece
      this.activePiece.clicked() ;
    }

    this.activePiece = pieceObj ;
  }

  setAsPlacingPiece(){
    $('input.radioplay').prop("checked",true) ;
    $('input.radioclear').prop("checked",false) ;
  }

  isPiecePlayOrClear(){
    return $('input[name="piecemode"]:checked').val() ;
  }

  getActivePiece(){
    return this.activePiece ;
  }

  playFirstSquare(){
    let x = Math.floor( Math.random() * (this.board.getWidth()*1-5) ) + 2 ;
    let y = Math.floor( Math.random() * (this.board.getHeight()*1-5) ) + 2 ; 
    this.board.getSquare(x,y).claimSquare() ;
  }

  grantNewPiece(){
    this.controlPanel.grantNewPiece() ;
  }

  setPlayerColor(){
    this.playerColor = this.getColorForPlayer(this.playerNumber) ;
  }

  getColorForPlayer(playerNumber){
    let colors = {
      1 : "rgb(139, 139, 203)" ,
      2 : "#ff0051" ,
      3 : "#0f8307" ,
      4 : "#ffeb3b" ,
      5 : "#051b68" ,
      6 : "#e7f9f9" ,
      7 : "#3e3e3e"
    }

    return colors[playerNumber] ;
  }

  recalculateWinConditions(){
    this.controlPanel.updateGoalDisplay() ;
  }

  grantPiecesForTurn(){
    let piecesToGrant = 1 + this.goals.getTotalGoalsAchieved();
    let i = 0 ;
    while (i < piecesToGrant){
      this.grantNewPiece() ;
      i++ ;
    }
  }

  finishTurnIfNoPiecesRemaining(){
    if (this.controlPanel.getHowManyPiecesRemaining() == 0){
      this.setMyTurn(false) ;
    }
  }
}