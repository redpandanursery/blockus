class ControlPanel {
  constructor(){
    this.obj = $("<div style='padding:10px;'></div>") ;
    this.goalDisplay = $("<div></div>") ;
    this.pieceDisplay = $("<div style='margin-right:-7px;height:40%;overflow-y:auto;'></div>") ;
    this.turnDisplay = $("<div style='display:none;margin-top:20px;font-size:30px;text-align:center;color:#8686c0;'>Your turn!<div style='font-size:12pt;'><span style='cursor:pointer;font-size:larger;color:rgb(13 13 52);' onclick='game.setMyTurn(false) ;'>Finish my turn</span></div></div>")
    this.messageDisplay = $("<div style='font-size:smaller;position:absolute;top:80%;height:20%;overflow:hidden;width:280px;'></div>") ;
    this.availablePieces = [] ;
    this.setupPieces() ;
    this.pieceModeSelectorObj = $("<div style='text-align:center;'><form><label style='cursor:pointer;'><input class='radioplay' type='radio' name='piecemode' value='play' checked='checked'> Play Piece</label> &nbsp;&nbsp;&nbsp;&nbsp; <label style='cursor:pointer;'><input class='radioclear' type='radio' name='piecemode' value='clear'> Clear Spaces</label></form></div>") ;
    this.obj.append(this.goalDisplay) ;
    this.obj.append($("<div style='font-weight:bold;text-align:center;font-size:35px;' class='piecetext'>Your Pieces</div>")) ;
    this.obj.append(this.pieceModeSelectorObj) ;
    this.obj.append(this.pieceDisplay) ;
    this.obj.append(this.turnDisplay) ;
    this.obj.append(this.messageDisplay) ;
    $(".controlpanel").append(this.obj) ;
  }

  updateGoalDisplay(){
    let totalGoals = game.goals.getTotalGoalCount() ;
    let achievedGoals = game.goals.getTotalGoalsAchieved() ;

    let html = "<progress style='width:280px;' value='"+achievedGoals+"' max='"+totalGoals+"'></progress><div style='text-align:center;'>"+achievedGoals+" out of "+totalGoals+" achievements claimed</div>" ;

    this.goalDisplay.html(html) ;
  }

  removePiece(objRef){
    let newPieceList = [] ;
    for (const piece of this.availablePieces){
      if (!piece.used){
        newPieceList.push(piece) ;
      }
    }

    this.availablePieces = newPieceList ;
  }

  getHowManyPiecesRemaining(){
    return this.availablePieces.length ;
  }

  newMessage(html){
    this.messageDisplay.html("<div style='margin-bottom:7px;text-align:center;'>"+html+"</div>"+this.messageDisplay.html()) ;
  }

  setupPieces(){
    let startingPieces = [
      [
        [0,0],
        [1,0],
        [2,0],
        [-1,0],
        [-2,0],
        [-2,-1]
      ],
      [
        [0,0],
        [0,1],
        [1,1],
        [1,2],
        [2,2],
        [2,3],
        [3,3]
      ]
    ] ;

    for (const pieceData of startingPieces){
      this.availablePieces.push(new Piece(pieceData)) ;
    }

    this.refreshPieceDisplay() ;
  }

  refreshPieceDisplay(){ //call when pieces are changed
    this.pieceDisplay.html("") ;
    for (const piece of this.availablePieces){
      this.pieceDisplay.append(piece.getObj()) ;
    }
  }

  grantNewPiece(pieceData = null){
    if (pieceData == null){
      pieceData = availablePieces[Math.floor(Math.random() * availablePieces.length)];
    }

    this.availablePieces.push(new Piece(pieceData)) ;
    this.refreshPieceDisplay();
  }
}

var availablePieces = [
  [
    [1,1],
    [1,0],
    [0,0]
  ],
  [
    [0,0],
    [0,-1],
    [0,1],
    [0,2]
  ],
  [
    [0,0],
    [1,0],
    [2,0],
    [-1,0],
    [-2,0],
    [-2,-1]
  ],
  [
    [0,0],
    [0,1],
    [1,1],
    [1,2],
    [2,2],
    [2,3],
    [3,3]
  ],
  [
    [-1,-1],
    [-1,0],
    [-1,1],
    [1,1],
    [1,0],
    [1,-1],
    [0,1]
  ],
  [
    [0,-3],
    [0,-2],
    [0,-1],
    [0,0],
    [0,1],
    [0,2],
    [0,3],
    [1,2]
  ],
  [
    [0,-1],
    [0,0],
    [0,1],
    [0,2],
    [1,2]
  ],
  [
    [0,0]
  ],
  [
    [0,0],
    [2,2],
    [1,1]
  ],
  [
    [2,0],
    [1,0],
    [0,0],
    [-1,0],
    [-1,1],
    [-1,2],
    [2,2]
  ],
  [
    [0,0],
    [0,1]
  ],
  [
    [1,1],
    [0,1],
    [1,0]
  ],
  [
    [0,0],
    [1,0]
  ],
  [
    [0,-3],
    [0,-2],
    [0,-1],
    [0,0],
    [0,1],
    [0,2],
    [0,3]
  ],
  [
    [-1,0],
    [0,0],
    [1,0],
    [2,0],
    [3,0],
    [3,1],
    [3,-1]
  ]
] ;