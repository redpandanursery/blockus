class Square {
  constructor(x,y){
    this.globalReference = newGlobalReference(this) ;
    this.x = x ;
    this.y = y ;
    this.defaultBackgroundColor = "#8cb370" ;
    this.backgroundColor = this.defaultBackgroundColor+"" ;
    this.obj = $("<div onclick='"+this.globalReference+".clickSquare();' onmouseover='"+this.globalReference+".mouseOver();' onmouseout='"+this.globalReference+".mouseOut();' class='square' style='background-color:"+this.backgroundColor+";'></div>") ;
    this.isGoal = false ;
    this.goalObj ;
    this.occupiedColor = null ;
    this.ownSquare = false ;
  }

  getHtmlObj(){
    return this.obj ;
  }

  setAsGoal(goalObj){
    this.isGoal = true ;
    this.goalObj = goalObj ;
    this.obj.addClass("goal") ;
    this.obj.html("*") ;
  }

  getX(){
    return this.x ;
  }

  getY(){
    return this.y ;
  }

  mouseOver(){
    game.getBoard().newMouseOver(this) ;
  }

  mouseOut(){
    game.getBoard().newMouseOut() ;
  }

  clickSquare(){
    game.getBoard().newSquareClick(this) ;
  }

  setHighlight(state = true,validLocation = true){
    let highlightColor = validLocation ? game.getPlayerColor() : "#e83b3b" ;
    let isPlayingPiece = game.isPiecePlayOrClear() == "play" ;
    if (this.occupiedColor != null){
      highlightColor = "#b51f1f" ;
    }
    this.obj.css("background-color",(state ? highlightColor : this.backgroundColor));
    if (!isPlayingPiece){
      this.obj.css("border","1px dashed black") ;
    }

    if (state && validLocation){
      this.obj.css("filter","brightness("+(isPlayingPiece ? ".7" : ".5")+")");    
    } else {
      this.obj.css("filter","brightness(1)");
      this.obj.css("border","") ;
    }
  }

  isFree(){
    if (this.occupiedColor == this.defaultBackgroundColor){
      return true ;
    }

    if (this.occupiedColor == null){
      return true ;
    }
  }

  setOccupiedColor(color){
    this.setHighlight(false) ;
    this.occupiedColor = color == this.defaultBackgroundColor ? null : color ; //set to null if occupied color is the default color
    this.backgroundColor = color ;
    this.obj.css("background-color",color) ;
  }

  claimSquare(isPlayingSquare = true){
    if (isPlayingSquare){
      this.setOccupiedColor(game.getPlayerColor()) ;
      this.ownSquare = true ;
      if (this.isGoal){
        console.log(this.goalObj) ;
        this.goalObj.achievedGoal() ;
      }
    } else {
      this.setOccupiedColor(this.defaultBackgroundColor) ;
      this.ownSquare = false ;
    }
  }

  setAchieved(){
    this.obj.addClass("achieved") ;
  }

  isOwnSquare(){
    return this.backgroundColor == game.getPlayerColor() ;
  }

  hasOwnSquareAdjacent(){
    let xPos = this.x-1 ;
    while (xPos < this.x+2){
      let yPos = this.y-1 ;
      while (yPos < this.y+2){
        let square = game.getBoard().getSquare(xPos,yPos) ;
        if (square != null){
          if (square.isOwnSquare()){
            return true ;
          }
        }
        yPos++ ;
      }
      xPos++ ;
    }

    return false ;
  }
}