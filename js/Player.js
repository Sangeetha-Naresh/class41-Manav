class Player 
{
  constructor()
  {
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.xpos=0;
    this.rank=null;
    this.flag=false;
  }

  getCount()
  {
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count)
  {
    database.ref('/').update({
      playerCount: count
    });
  }

  update()
  {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      xpos:this.xpos
    });
  }

  static getPlayerInfo()
  {
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }


  
  static removePlayerInfo()
  {
    var playerInfoRef = database.ref('players');
    playerInfoRef.remove();
  }

  getCarsAtEnd() 
  {
    database.ref('CarsAtEnd').on("value",(data)=>{
                                      this.rank = data.val();
    });
  }

  static updateCarsAtEnd(rank)
  {
    database.ref('/').update({
      CarsAtEnd:rank
    })
  }
}
