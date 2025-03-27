class SelectGame {
  constructor(){
    this.obj = $("<div style='font-size:larger;font-family:calibri;text-align:center;padding-top:100px;'></div>") ;
    this.gameId = null ;
    this.gameList = $("<div>Loading...</div>") ;
    this.obj.append(this.gameList) ;
    $(".boardviewer").append(this.obj) ;
    this.loadAvailableGameDetails() ;
  }

  loadAvailableGameDetails(){
    $.ajax({
      type: "POST",
      url: "https://redpandanursery.com/blockus/request.php?type=getgames",
      data: "",
      success: function (response){selectGame.loadedGameDetails(response)}
    });
  }
  
  loadedGameDetails(response){
    let html = "<h2>Join Existing Game:</h2><div style='margin-top:-15px;border:1px solid lightgray; width:300px;margin-left:auto;margin-right:auto;'>" ;
    for (const game of JSON.parse(response)){
      html += "<span style='cursor:pointer;' onclick='selectGame.joinGame("+game.id+")'>"+game.name+"</span><br />" ;
    }
    html+="</div>"

    html += "<h2 style='cursor:pointer;' onclick='selectGame.promptNewGame();'>Host New Game</h2>"
    this.gameList.html(html) ;
  }

  promptNewGame(){
    let date = new Date() ;

    let name = prompt("New Game Name",date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()) ;
    if (name != null){
      this.createGame(name) ;
      this.gameList.html("Loading...") ;
    }
  }

  createGame(gameName){
    $.ajax({
      type: "POST",
      url: "https://redpandanursery.com/blockus/request.php?type=creategame",
      data: {name:gameName},
      success: function (response){selectGame.createdGame(response)}
    });
  }

  createdGame(response){
    let details = JSON.parse(response) ;
    this.joinGame(details.gameId) ;
  }

  joinGame(gameId){
    this.gameId = gameId ;
    $.ajax({
      type: "POST",
      url: "https://redpandanursery.com/blockus/request.php?type=joingame&id="+gameId,
      data: "",
      success: function (response){selectGame.joinedGame(response)}
    });
  }

  joinedGame(response){
    let details = JSON.parse(response) ;
    let playerId = details.playerId ;
    game.setGameId(this.gameId) ;
    game.setPlayerNumber(playerId) ;
    this.hideOptions() ;
    game.runSetup() ;
  }

  displayOptions(){
    this.obj.show() ;
    let html = "" ;
    this.obj.html(html) ;
  }

  hideOptions(){
    this.obj.hide() ;
  }
}