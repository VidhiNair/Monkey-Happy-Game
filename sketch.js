
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var groundimg , ground , invisibleGround;
var score;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  groundimg = loadImage("ground.png");
  
  
  
 
}



function setup() 
{
 createCanvas(400 , 400); 
  
 
  monkey = createSprite(200 , 200 ,20 ,20)
  monkey.scale = 0.1;
  
  monkey.addAnimation("running" , monkey_running);
  
  ground = createSprite(200 , 460 , 400 , 10);
  ground.addImage(groundimg)
 
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  invisibleGround = createSprite(200 , 390 , 400 , 10);
  invisibleGround.visible = false;
  
  ground.velocityX = -3;
  
 
  
  
  
  console.log(ground.width / 2 );
}


function draw() 
{

  background("white");
  
 
  survivalTime = survivalTime + Math.round(getFrameRate() / 60);
  
  monkey.velocityX = 0.001
  
  if(ground.x < 200)
    {
       ground.x = ground.width / 2;
    }
  
  
  if(keyDown("space") && monkey.y > 200)
    {
      monkey.velocityY = -12;
  
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(invisibleGround);

  
  if(FoodGroup.isTouching(monkey))
    {
      FoodGroup.destroyEach();
    }
  
  
  if(monkey.isTouching(obstacleGroup))
    {
      monkey.collide(obstacleGroup);
    }
  
  
  spawnBanana();
  spawnObstacles();
  
  monkey.depth = ground.depth + 1
  
  drawSprites(); 
  
  stroke("black");
  textSize(20)
  text("SURVIVAL TIME:" + survivalTime ,100 , 50 );
  
}

function spawnBanana()
{
  if(frameCount % 180 === 0)
  {
   banana = createSprite(450,Math.round(random(120 , 200))  , 20 ,20 );
   banana.scale = 0.1;
   banana.velocityX = -3;
   banana.addImage(bananaImage);
    
   banana.depth = monkey.depth - 1;
   FoodGroup.add(banana);
  }
}

function spawnObstacles()
{
 if(frameCount % 100 === 0)
 {
  
  obstacle = createSprite(Math.round(random(270 , 350)) , 360 , 20       ,20);
  obstacle.scale = 0.1;
  obstacle.velocityX = -3;
  obstacle.addImage(obstacleImage);
   
  obstacleGroup.add(obstacle);
 }
}



