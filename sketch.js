 var trex,trex_running ,ground,ground_image ,invisible_ground ,cloud_image  ,obstacle1 ,obstacle2 ,obstacle3 , obstacle4 ,obstacle5 ,obstacle6 ,cloudGroup ,obstacleGroup ,score, gameover,gameover_image,restart , restart_image,trex_collided;
var PLAY = 1;
var END = 0;
var gameState = PLAY;            

function preload(){
trex_running = loadAnimation("trex1.png" ,"trex3.png" ,"trex4.png" ) ;
 ground_image = loadImage( "ground2.png") ;
 cloud_image = loadImage("cloud.png");
 obstacle1 = loadImage("obstacle1.png");
 obstacle2 = loadImage("obstacle2.png");
 obstacle3 = loadImage("obstacle3.png");
 obstacle4 = loadImage("obstacle4.png");
 obstacle5 = loadImage("obstacle5.png");
 obstacle6 = loadImage("obstacle6.png");
 gameover_image =loadImage("gameOver.png");
 restart_image = loadImage ("restart.png");
 trex_collided = loadAnimation ("trex_collided.png");
}  

function setup() {
createCanvas(600, 200);
trex= createSprite(50,180,20,50) ;
trex.addAnimation("running",trex_running) ;
trex.scale =0.5 ;
trex.addAnimation("collided",trex_collided) ;
ground =createSprite (200,180,400,20) ;
ground.addImage("ground" ,ground_image) ;  
ground.velocityX = -6
invisible_ground =createSprite (200,190,400,10) ; 
invisible_ground.visible =false  ;
cloudGroup =new Group();
obstacleGroup = new Group();
score = 0 ;
gameover = createSprite(300,100);
restart = createSprite(300,140);
gameover.addImage("gameover",gameover_image);
 gameover.scale = 0.5 ; 
  gameover.visible = false;
restart.addImage("restart",restart_image);
restart.scale = 0.5 ;
restart.visible =false ;
}

function draw() {
  background(255);
 text("Score: "+ score, 400,50);
  
   
  if(gameState === PLAY){
    //move the ground
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
       
    if (score>0 && score%100 === 0){
     // playSound("checkPoint.mp3");
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12 ;
      //playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
   
    trex.collide(invisible_ground) ;
 
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obstacleGroup.isTouching(trex)){
//playSound("jump.mp3");
      gameState = END;
     // playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
     
    if(mousePressedOver(restart)) {
    reset();
  }
    
  } 
  drawSprites() ;
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round (random(80,120));
    cloud.addImage(cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 334;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
  
  }
  
}
function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand =Math.round( random(1,6));
    switch(rand){
      case 1:obstacle.addImage (obstacle1);
            break ;
      case 2:obstacle.addImage (obstacle2);
            break ;
      case 3:obstacle.addImage (obstacle3);
            break ;
      case 4:obstacle.addImage (obstacle4);
            break ;
      case 5:obstacle.addImage (obstacle5);
            break ;
      case 6:obstacle.addImage (obstacle6);
            break ;
            default:break ;        
    }
        
        
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 270;
  obstacleGroup.add(obstacle) ;
  }
}
function reset(){
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}