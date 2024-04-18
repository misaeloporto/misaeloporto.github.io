var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        //video 2: 25:21
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree;
        var buildings = []; // creates an array for buildings
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#CCCCFF');// this create the width and the gtround in proportion to your window. #CCCCFF is the color of the background and groundY makes the color stop once it hits
            background.addChild(backgroundFill);
            
            // TODO 2: - Add a moon and starfield
            
            //this creates the stars in the background
            for(var stars = 0; stars < 100; stars++ ){
                var circle = draw.circle(10, "white", "yellow", 2);// creates a circle varable and store it 
                circle.x = canvasWidth * Math.random();//gave x value 
                circle.y = groundY * Math.random();//gave y value 
                background.addChild(circle);// adds it to the background
            }

            var moon = draw.bitmap("img/moon.png");// draw.bitmap holds our image and store it to moon
            moon.x = canvasWidth - 250;
            moon.y = groundY - 350;
            moon.scaleX = 0.5;
            moon.scaleY = 0.5;
            background.addChild(moon);
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            var buildingColors = ["blue", "orange", "yellow", "red", "purple"]
            for (var i = 0; i < 5; i++) { // build our for loop and set it to zero. i < 5 means theere will be only 5 buildings
                var buildingHeight = 300 * Math.random();// how tall the building is
                var building = draw.rect(75, buildingHeight, buildingColors[i], "black", 3); // this draws a single building using building height as a peramerter
                building.x = 200 * i; // makes the first building start at the left side, every time this runs it will be mutliped by 200. ex 2 times 200 = 400, so the 3rd building will be 400 pixels
                building.y = groundY - buildingHeight; // starts at the ground and subtracts the height of the building 
                background.addChild(building);// adds it to the background
                buildings.push(building); // pushes it to the array.
              }

            
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png");
                tree.x = canvasWidth - 225;
                tree.y = groundY - 225;
                background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x = tree.x - 3;// makes it so that tree x equals whatever is imputed into it subtact 8. makes it so that the object will move to the left 
            if(tree.x < -300){
                tree.x = canvasWidth;
            }
            // TODO 4: Part 2 - Parallax
            for(var i = 0; i < buildings.length; i++){
                var building = buildings[i];
                building.x = building.x - 1;

                if (building.x < -100){
                    building.x = canvasWidth
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
