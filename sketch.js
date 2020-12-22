var dog, dogImg, happyDog, database, foodS, foodStock;

function preload(){
  happyDog = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png");
}

function setup(){
  createCanvas(500, 500);
  dog = createSprite(250, 250, 50, 50);
  dog.addImage(dogImg);
  dog.scale = 0.25;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw(){  
  background(46, 139, 87);
  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  stroke('black');
  fill("white");
  textSize(20);
  text("Food Remaining = "+foodS, 50, 20);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if (x <= 0){
    x = 0;
  }
  else {
    x = x - 1;
  }

  database.ref('/').update({
    Food:x
  })
}