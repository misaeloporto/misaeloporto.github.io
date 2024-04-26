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
   

    function createReward(x, y){
      var reward = game.createGameItem("reward", 25);
      var yellowSquare = draw.bitmap('img/mario star reward.png');
      yellowSquare.x = -37;
      yellowSquare.y = -40;
      reward.addChild(yellowSquare);
      reward.x = 1500;
      reward.y = groundY - 80;
      game.addGameItem(reward);
      reward.velocityX = -3;
  
      reward.onPlayerCollision = function () {
        game.changeIntegrity(20)
        game.increaseScore(50);
        reward.shrink()
      };
  
    reward.onProjectileCollision = function(){


      }
    }

   



    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects = level.gameItems;
      for(var i = 0;i < levelObjects.length; i++){
        var element = levelObjects[i];
        if(element.type === 'sawblade'){
          createSawBlade(element.x, element.y);
        }
        if(element.type === 'reward'){
          createReward(element.x, element.y);
        }
        if(element.type === 'enemy'){
          createEnemy(element.x, element.y);
        }
        if(element.type === 'marker'){
          createMarker(element.x, element.y);
        }
      }

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
