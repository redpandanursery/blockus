class SendSync {
  constructor(payload){
    payload.game = game.getGameId() ;
    payload.player = game.getPlayerNumber() ;

    $.ajax({
      type: "POST",
      url: "https://redpandanursery.com/blockus/request.php?type=newsync",
      data: {"sync":JSON.stringify(payload)},
      success: function (response){console.log(response)}
    });
  }
}