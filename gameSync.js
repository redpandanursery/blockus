class GameSync {
  constructor(){
    this.syncsReceived = [] ; //stores all syncs loaded from the server
    this.syncIds = [] ;
    this.lastSyncId = 0 ; //the last id of the sync loaded

    this.syncsSent = [] ;

    setInterval(function(){game.sync.requestSync()},5000) ;
  }

  // Public Sync Events
  claimSquares(squareAddressArray,isPlayingPiece = true){
    let playerColor = isPlayingPiece ? game.getPlayerColor() : "#8cb370" ;
    let payload = {
      "event" : "claimsquares" ,
      "data" : {"squares":squareAddressArray,"color":playerColor}
    } ;

    this.sendSync(payload) ;
  }

  finishedTurn(){
    let payload = {
      "event" : "finishedturn",
      "data"  : {"playerNumber":game.getPlayerNumber()}
    }
    this.sendSync(payload) ;
  }

  newPlayer(playerNumber){
    let payload = {
      "event" : "newplayer",
      "data"  : {"playerNumber":playerNumber}
    }
    this.sendSync(payload) ;
  }
  
  sendMessage(html){
    let payload = {
      "event" : "message",
      "data" : {"message":html}
    }
    this.sendSync(payload) ;
  }






  // Back End Events
  sendSync(payload){
    this.syncsSent.push(new SendSync(payload)) ;
  }

  requestSync(){
    $.ajax({
      type: "POST",
      url: "https://redpandanursery.com/blockus/request.php?type=getsyncs&game="+game.getGameId()+"&last="+this.lastSyncId,
      data: "",
      success: function (response){game.sync.receiveSync(response)}
    });
  }

  receiveSync(response){
    let events = JSON.parse(response) ;

    for (const event of events){
      if (event.syncId*1 > this.lastSyncId){
        this.lastSyncId = event.syncId ;
      }
      if (!this.syncIds.includes(event.syncId)){
        this.syncIds.push(event.syncId) ;
        new SyncEvent(event) ;
      }
    }

  }



  
}