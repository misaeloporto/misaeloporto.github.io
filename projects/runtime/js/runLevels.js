var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    
      function createSawBlade(x, y, damage){
      var hitZoneSize = 25;//delcares the size of the hit zone set as 25
      var damageFromObstacle = damage;// can let you do more or less damage if you have 1 or more Obstacle
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);//creates the first obstcle and gives it a hatzone + damage
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x = -25;
      obstacleImage.y = -25;
      sawBladeHitZone.rotationalVelocity = 10 // makes the sawblades rotate
   }
   createSawBlade(400, groundY- 120, 10);
   createSawBlade(700, groundY- 120, 20);
   createSawBlade(900, groundY- 120, 30);

  function createEnemy(x, y){
    var enemy = game.createGameItem("enemy", 25);
    var redSquare = draw.bitmap('img/donkeyKong.png');
    redSquare.x = -75;
    redSquare.y = -150;
    enemy.addChild(redSquare);// adds child red sqaure to enemy
    enemy.x = x;
    enemy.y = y;
    game.addGameItem(enemy);//adds emnemy to the game
    enemy.velocityX = -4;
    redSquare.scaleX = 0.75;
    redSquare.scaleY = 0.75;

    enemy.onPlayerCollision = function (){
    game.changeIntegrity(-15);
    };

    enemy.onProjectileCollision = function(){
    game.increaseScore(100);
    enemy.fadeOut();
    //enemy.Shrink()
    //enemy.flyTo(0, 0)
    }
  }
    createEnemy(600, groundY - 250);
    createEnemy(800, groundY - 250);

    function createReward(x, y){
      var reward = game.createGameItem("enemy", 25);
      var blueSquare = draw.rect(50, 50, "blue");
      blueSquare.x = -25;//hitzone for the reward  on x position
      blueSquare.y = -25;//hitzone for the reward on y position 
      reward.addChild(blueSquare);// adds child red sqaure to reward
      reward.x = x;// controls where the image appears on the x position 
      reward.y = y;// controls where the image appears on the y position
      game.addGameItem(reward);//adds enemy to the game
      reward.velocityX = -3;// controls how fast the reward moves to hallebot
      reward.rotationalVelocity = 0;// would make the enemy spin but it's set at zero so it doesn't spin
  
      reward.onPlayerCollision = function (){
      game.changeIntegrity(10);
      game.increaseScore(50);
      reward.flyTO(0, 0);
    };
  
    reward.onProjectileCollision = function(){
      game.increaseScore(100);
      reward.fadeOut();
      //reward.Shrink()
      //reward.flyTo(x,y)
      }
    }

    createReward(1000, groundY - 50);



    function startLevel() {
      // TODO 13 goes below here

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
