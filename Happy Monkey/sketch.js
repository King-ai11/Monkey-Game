var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;


function preload(){
  backImage=loadImage("https://assets.editor.p5js.org/5e47b48e2c71cf001ec2872f/42e440b7-edba-485b-a005-9b717cf320df.jpg");
  player_running = loadAnimation("https://assets.editor.p5js.org/5e5a1e608c93a2001f0724fb/d06cad1d-bf0f-438a-8705-1dbf9aa39bf7.png","https://assets.editor.p5js.org/5e47b48e2c71cf001ec2872f/f4ff6665-60bd-4cb7-814c-079e5ca3c58f.png","https://assets.editor.p5js.org/5e47b48e2c71cf001ec2872f/20945163-b237-4ea5-87bb-883a87387b24.png","https://assets.editor.p5js.org/5e47b48e2c71cf001ec2872f/99315c6c-138f-424c-94c7-762af1d9668d.png","https://assets.editor.p5js.org/5e47b48e2c71cf001ec2872f/749a619e-f151-46d9-8efc-bd9f598ed00c.png","https://assets.editor.p5js.org/5e47b48e2c71cf001ec2872f/fe7597c5-ec30-4856-8b51-76aa9c8ea33b.png","https://assets.editor.p5js.org/5e47b48e2c71cf001ec2872f/453b6c72-3417-4f8a-8fb2-842d5429a5f0.png","https://assets.editor.p5js.org/5e47b48e2c71cf001ec2872f/2585aea8-9998-45d2-85e4-f25ca1095d45.png","https://assets.editor.p5js.org/5e47b48e2c71cf001ec2872f/9dde8b8f-a155-4fbf-86af-f225bafeb9d4.png","https://assets.editor.p5js.org/5e47b48e2c71cf001ec2872f/d1f9a2b6-6030-4d95-8dd2-b5e521949803.png");
  
  

  bananaImage = loadImage("https://assets.editor.p5js.org/5e5a1e608c93a2001f0724fb/5a7bade8-0d42-46c7-84ad-0e601e401ff7.png");
  obstacle_img = loadImage("https://assets.editor.p5js.org/5e5a1e608c93a2001f0724fb/a6acd225-f9bc-464e-948c-3bea8023d7b6.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;
     // score=score-2;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  







