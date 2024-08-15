class Square {
  constructor(x,y){
    this.x = x ;
    this.y = y ;
    this.obj = $("<div class='square'></div>") ;
  }

  getHtmlObj(){
    return this.obj ;
  }
}