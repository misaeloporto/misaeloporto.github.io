/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width()
  const BOARD_HEIGHT = $("#board").height()
  const BALL_WIDTH = $("#ball").width()
  const BALL_HEIGHT = $("#ball").height()
  // Game Item Objects

  const KEY = {
    "W": 87,
    "S": 83,
    "UP":38,
    "DOWN":40,
  }

  function gameItem(id, speedX, speedY){
    var objInstance = {
      id: id,
      x: parseFloat($(id).css("left")),
      y:parseFloat($(id).css("top")),
      speedX: speedX,
      speedY: speedY,
      w: $(id).width(),
      h: $(id).height(),
    }
    return objInstance
  }

  var paddleLeft = gameItem("#paddleLeft", 0 ,0)
  var paddleRight = gameItem("#paddleRight", 0 ,0)
  var ball = gameItem("#ball", (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1),(Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1))
  
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);   
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawGameItem(paddleLeft);
    updateGameItem(paddleLeft)
    drawGameItem(paddleRight);
    updateGameItem(paddleRight);
    drawGameItem(ball);
    updateGameItem(ball)
    wallCollision(paddleLeft);
    wallCollision(paddleRight);
    ballBounds(ball);
    paddleCollision(ball, paddleLeft, paddleRight);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      paddleLeft.speedY = -5
    }
    if(event.which === KEY.S){
      paddleLeft.speedY = +5
    }
    if(event.which === KEY.UP){
      paddleRight.speedY = -5
    }
    if(event.which === KEY.DOWN){
      paddleRight.speedY = +5
    }
  }
  function handleKeyUp(event){
    if(event.which === KEY.W || event.which === KEY.S){
      paddleLeft.speedY = 0
    }
    if(event.which === KEY.UP || event.which === KEY.DOWN){
      paddleRight.speedY = 0
    }
    
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //movement helper 
  function drawGameItem(obj){
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  function updateGameItem(obj){
    obj.x += obj.speedX
    obj.y += obj.speedY
  }

  function wallCollision(obj){
    if(obj.y > BOARD_HEIGHT - obj.h||obj.y < 0 ){
      obj.y -= obj.speedY
    }
  }

  function hitBox(obj){
    obj.leftX = obj.x;
    obj.rightX = obj.x + obj.w;
    obj.topY = obj.y;
    obj.bottomY = obj.y + obj.h;
  }

  function ballBounds(obj){
    hitBox(obj)
    if(obj.topY < 0 || obj.bottomY > BOARD_HEIGHT){
      obj.speedY = -obj.speedY
    }
    if(obj.leftX < 0 ||obj.rightX > BOARD_WIDTH){
      obj.speedX = -obj.speedX
    }
  }
  function paddleCollision(ball, paddle1, paddle2){
    hitBox(ball)
    hitBox(paddle1)
    hitBox(paddle2)
    if(ball.leftX < paddle1.rightX && ball.topY > paddle1.topY && ball.bottomY < paddle1.bottomY){
      ball.speedX = -ball.speedX
    }
    if(ball.rightX > paddle2.leftX && ball.topY > paddle2.topY && ball.bottomY < paddle2.bottomY){
      ball.speedX = -ball.speedX
    }
  }

  function ballWallCollision(){
   
  }

  function increasePoints(){
    
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
