class Goal {
  constructor(goalCoorindates){
    /*
    let goalCoorindates = null ;
    let x,y ;
    while (goalCoorindates == null){
      x = Math.floor( Math.random() * (game.board.getWidth()*1-5) ) + 2 ;
      y = Math.floor( Math.random() * (game.board.getHeight()*1-5) ) + 2 ; 
      if (!game.board.getSquare(x,y).isGoal){
        goalCoorindates = [[x,y]] ;
      }
    }
    */

    this.goalCoorindates = goalCoorindates ;
    this.squares = [] ;
    this.achieved = false ;

    for (const coordinateArray of goalCoorindates){
      let x = coordinateArray[0] ;
      let y = coordinateArray[1] ;
      let square = game.getBoard().getSquare(x,y) ;
      this.squares.push(square) ;
      square.setAsGoal(this) ;
    }
   
  }

  isGoalOwned(){
    for (const square of this.squares){
      if (square.isOwnSquare()){
        return true ;
      }
    }

    return false ;
  }

  achievedGoal(){
    let messageHtml = "<div style='font-size:larger;color:"+game.playerColor+"'>"+game.getPlayerName()+" has achieved this goal!</div>" ;
    game.sync.sendMessage(messageHtml) ;

    this.achieved = true ;
    for (const square of this.squares){
      square.setAchieved() ;
    }
  }

  getGoalDisplay(){
    let html = "" ;
    
  }
}