class Board {
  constructor(){
    this.squareWidth = 20 ; //in pixels
    this.width = 60 ; //number of x squares
    this.height = 50 ; //number of y squares
    this.squares = [] ;
    this.boardObj = this.buildBoard() ;
    this.hoverSquare = null ;
    $("div.boardviewer").append(this.boardObj) ;
    //$("div.board").css("width",this.width*this.squareWidth).css("height",this.height*this.squareWidth) ;
  }

  getWidth(){
    return this.width ;
  }

  getHeight(){
    return this.height ;
  }

  getSquare(x,y){
    let xPos = x-1 ;
    let yPos = (y-1) * this.width ;
  
    if (x<1 || y<1 || (xPos+yPos) > (this.squares.length - 1)){
      return null ;
    }

    return this.squares[xPos+yPos]  ;
  }

  buildBoard(){
    const board = $("<div class='board' style='margin:10px;'></div>") ;

    let y = 0 ;
    let row ;
    while (y < this.height){
      y++ ;
      let x = 0 ;
      row = $("<div style='display:table;width:"+(this.width*this.squareWidth*1)+"'></div>") ;
      while (x < this.width){
        x++ ;
        let newSquare = new Square(x,y) ;
        row.append(newSquare.getHtmlObj()) ;
        this.squares.push(newSquare) ;
      }
      board.append(row) ;
    }

    return board ;
  }

  newMouseOver(squareObj){
    if (this.hoverSquare != null){
      this.newMouseOut() ;
    }

    this.hoverSquare = squareObj ;
    if (game.getActivePiece() != null){ //display selected piece on board if one is selected
      let pieceSquares = this.getSquaresForPiece(game.getActivePiece(),squareObj) ;
      let isValidLocation = this.areAllSquaresValid(pieceSquares) ;

      //highlight squares
      for (const square of pieceSquares){
        if (square != null){
          square.setHighlight(true,isValidLocation) ;
        }
      }
    }
  }

  newMouseOut(){
    if (game.getActivePiece() != null){
      let pieceSquares = this.getSquaresForPiece(game.getActivePiece(),this.hoverSquare) ;

      //unhighlight squares
      for (const square of pieceSquares){
        if (square != null){
          square.setHighlight(false) ;
        }
      }
    }

    this.hoverSquare = null ;
  }

  newSquareClick(squareObj){
    if (game.myTurn){
      if (game.getActivePiece() != null){ //attempt to set piece 
        let pieceSquares = this.getSquaresForPiece(game.getActivePiece(),squareObj) ;
        let isValidLocation = this.areAllSquaresValid(pieceSquares) ;

        if (isValidLocation){
          game.getActivePiece().remove() ;
          game.setActivePiece(null) ;
          
          //setTimeout(function(){game.grantNewPiece()},800) ;
          //highlight squares
          let squareAddressesToClaim = [] ;
          let isPlayingPiece = game.isPiecePlayOrClear() == "play" ;
          for (const square of pieceSquares){
            if (square != null){
              square.claimSquare(isPlayingPiece) ;
              squareAddressesToClaim.push([square.getX(),square.getY()]) ;
            }
          }
          game.sync.claimSquares(squareAddressesToClaim,isPlayingPiece) ;
          //game.setMyTurn(false) ; //finish turn after playing single piece
          game.setAsPlacingPiece() ;
          game.recalculateWinConditions() ;
          game.finishTurnIfNoPiecesRemaining() ;
        }
      }
    }
  }

  getSquaresForPiece(piece,squareObj){
    let squares = [] ;
    let startingX = squareObj.getX() ;
    let startingY = squareObj.getY() ;

    for (const coordinates of game.getActivePiece().getPieceData()){
      let x = startingX + coordinates[0] ;
      let y = startingY + coordinates[1] ;
      let pieceSquare = this.getSquare(x,y) ;

      squares.push(pieceSquare) ; //addresses off the board are added to this list as nulls
 
    }

    return squares ;
  }

  areAllSquaresValid(squareArray){
    //check that all squares are valid
    for (const square of squareArray){
      if (square == null){ //square is off the board
        return false ;
      }

      if (game.isPiecePlayOrClear() == "play"){ //if clearing pieces then it will allow the piece to be placed anywhere
        if (!square.isFree()){ //square is already occupied
          return false ;
        }
      } else {
        console.log("clearing piece") ;
      }
    }

    //check that at least one adjacent square is occupied by the same player
    for (const square of squareArray){
      if (square.hasOwnSquareAdjacent()){
        return true ;
      }
    }
    return false ;
  }
}