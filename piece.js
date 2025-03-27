class Piece {
  constructor(pieceDataArray){
    this.globalReference = newGlobalReference(this) ;
    this.pieceDataArray = pieceDataArray ;
    this.active = false ;
    this.used = false ;
    this.obj = $("<div class='piece' onclick='"+this.globalReference+".clicked();' style='margin:5px;cursor:pointer;float:left;'></div>") ;
    this.shapeObj = $("<div style='position:relative;'></div>") ;
    this.obj.append(this.shapeObj) ;
    this.refreshDrawing() ;
  }

  getObj(){
    return this.obj ;
  }

  refreshDrawing(){
    this.shapeObj.html("") ; //clear the drawing
    let boxDimension = 17 ;
    let maxLeft = 0 ;
    let maxRight = 0 ;
    let maxTop = 0 ;
    let maxBottom = 0 ;

    for (const point of this.pieceDataArray){
      let x = point[0] ;
      let y = point[1] ;

      if (x > maxRight){
        maxRight = x ;
      }

      if (x < maxLeft){
        maxLeft = x ;
      }

      if (y < maxBottom){
        maxBottom = y ;
      }

      if (y > maxTop){
        maxTop = y ;
      }

      let marginLeft = x * boxDimension ;
      let marginTop = y * boxDimension ;

      this.shapeObj.append("<div class='square' style='top:"+marginTop+";left:"+marginLeft+";position:absolute;width:"+(boxDimension-2)+"px;height:"+(boxDimension-2)+"px;'></div>") ;
    }

    let spaceWidth = maxRight - maxLeft + 1 ;
    let spaceHeight = maxTop - maxBottom + 1 ;

    this.obj.css("width",spaceWidth*boxDimension) ;
    this.obj.css("height",spaceHeight*boxDimension) ;
    this.shapeObj.css("margin-left",maxLeft*boxDimension*-1) ;
    this.shapeObj.css("margin-top",maxBottom*boxDimension*-1) ;
  }

  clicked(){
    if (this.active){ //unclicking
      this.shapeObj.find(".square").css("background-color","") ;
      this.active = false ;
      this.shapeObj.attr("class","") ;
      game.setActivePiece(null) ;
    } else { //clicking
      this.shapeObj.find(".square").css("background-color",game.getPlayerColor()) ;
      this.active = true ;
      this.shapeObj.attr("class","active") ;
      game.setActivePiece(this) ;
    }
  }

  getPieceData(){
    return this.pieceDataArray ;
  }

  remove(){
    this.obj.fadeOut() ;
    this.used = true ;
    game.controlPanel.removePiece(this) ;
  }
}