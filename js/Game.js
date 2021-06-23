class Game 
{
  constructor(){}

  getState()
  {
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state)
  {
    database.ref('/').update({
      gameState: state
    });
  }

  async start()
  {
    if(gameState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists())
      {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4img);
    
    cars = [car1, car2, car3, car4];
  }

  play()
  {
    form.hide();

    Player.getPlayerInfo();
    
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined)
    {
      background(groundimg);
      image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5);
     
      var index = 0;

      
      var x = 175;
      var y;

      for(var plr in allPlayers)
      {
     
        index = index + 1 ;

       
        x =200+(200*index)+ allPlayers[plr].xpos;
      
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index)
        {
          stroke(10);
          fill('red');
          ellipse(x,y,60,60);
   
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }

           
       
      
      }

      for(var i=0;i<cars.length;i++)
      {
        for(var j=1;j<cars.length-1;j++)
        {
          if(cars[i].isTouching(cars[j]))
          {
            flag=true;
          }
        }
       
      }

    }

   

    if(keyIsDown(UP_ARROW) && player.index !== null && flag===false)
    {
      player.distance +=10;
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null && flag===false) 
    {
      player.xpos-=10;
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null  && flag===false)
    {
      player.xpos+=10;
      player.update();
    }


    if(player.distance >4000)
    {
      gameState=2;
      
      player.rank +=1;  // player.rank=player.rank+1
      Player.updateCarsAtEnd(player.rank);
      
    }

    drawSprites();
  }

  end()
  {
  
    alert("GAME ENDED!! \n  Player rank is :"+ player.rank);
    gameState=0;

  }

}
