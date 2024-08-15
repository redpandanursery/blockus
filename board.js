class Board {
  constructor(){
    this.width = 30 ;
    this.height = 30 ;
    this.squares = [] ;
    this.boardObj = this.buildBoard() ;
  }

  getPiece(x,y){

  }

  buildBoard(){
    const board = $("<div></div>") ;

    let y = 0 ;
    while (y < this.height){
      let x = 0 ;
      while (x < this.width){
        let newSquare = new Square(x,y) ;
        board.append(newSquare.getHtmlObj()) ;
        this.squares.push(newSquare) ;
        x++ ;
      }
      y++ ;
    }

    return board ;
  }
}