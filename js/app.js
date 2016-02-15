// 
/**
* @description Represents the Game controller
* @constructor
*/
var Controller = function() {
    this.init = false;
    this.time = 60;

};

/**
* @description Used to reload the game
*/
Controller.prototype.reload = function(){
    window.location.reload();

};

/**
* @description Used to pause the game
*/
 Controller.prototype.pause = function() {
    this.init = false;
    clearInterval(this.myVar);


};

// TODO: modify stop function
// Stops game
//  Controller.prototype.stop = function(){
//     this.init = false;
//     clearInterval(myVar);
// }

/**
* @description Start the game here
*/
Controller.prototype.start = function() {
    this.init = true;
    countDown(this.time, 'timer');
    var myVar = setInterval(generateEnemiesTimer, 1000);
};

/**
* @description Enemies our player must avoid
* @constructor
* @param {number} x - Position on canvas 
* @param {number} y - Position on canvas 
* @param {number} speed - enemy speed
*/
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x =x;
    this.y =y;
    this.speed = speed;
    this.pos = [x, y];
    this.size = [101,171];
    this.hitbox = [50, 50];

    // Setting up parametters to be used in collision detection
    this.top = this.y + (this.size[1]/2) - (this.hitbox[1]/2);
    this.right = this.x + (this.size[0]/2) + (this.hitbox[0]/2);  
    this.left = this.x + (this.size[0]/2) - (this.hitbox[0]/2);  
    this.bottom = this.y + (this.size[1]/2) + (this.hitbox[1]/2);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

/**
* @description Update the enemy's position, required method for game
* @param {number}: dt, a time delta between ticks
*/
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt *101;


    // Updating parametters to be used in collision detection
    this.top = this.y + (this.size[1]/2) - (this.hitbox[1]/2);
    this.right = this.x + (this.size[0]/2) + (this.hitbox[0]/2);  
    this.left = this.x + (this.size[0]/2) - (this.hitbox[0]/2);  
    this.bottom = this.y + (this.size[1]/2) + (this.hitbox[1]/2);
};

/**
* @description Draw the enemy on the screen, required method for game
*/
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Player 
* @constructor
* @param {number} x - Position on canvas 
* @param {number} y - Position on canvas 
* @param {number} speed - player speed
*/
var Player = function(x,y,speed) {
    this.life = 3;
    this.x =x;
    this.y =y;
    this.pos = [x, y];
    this.speed = speed;
    this.size = [101,171];
    this.hitbox = [50, 50];

    // Setting up parametters to be used in collision detection
    this.top = this.y + (this.size[1]/2) - (this.hitbox[1]/2);
    this.right = this.x + (this.size[0]/2) + (this.hitbox[0]/2);  
    this.left = this.x + (this.size[0]/2) - (this.hitbox[0]/2);  
    this.bottom = this.y + (this.size[1]/2) + (this.hitbox[1]/2);
    this.score = 0;


    this.sprite = 'images/char-boy.png';
    var img = new Image();
    img = 'images/char-boy.png';


};

/**
* @description Update the player's position, required method for game
* @param {number}: dt, a time delta between ticks
*/
Player.prototype.update = function() {
    // Updating parametters to be used in collision detection
    this.top = this.y + (this.size[1]/2) - (this.hitbox[1]/2);
    this.right = this.x + (this.size[0]/2) + (this.hitbox[0]/2);  
    this.left = this.x + (this.size[0]/2) - (this.hitbox[0]/2);  
    this.bottom = this.y + (this.size[1]/2) + (this.hitbox[1]/2);
};

/**
* @description Draw the enemy on the screen, required method for game
*/
Player.prototype.render = function() {
// Draw player onto canvas
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    $("#score").text("Score: "+this.score);
    if (this.life<1) {
        $("#life").text("Life: "+ this.life+" Game Over");
    } else {
        $("#life").text("Life: "+this.life);
    }



};

/**
* @description Handle keyboard inputs to move the player.
* @param {string}: keyCode, a identifier for the arrow key pressed that is used to move the player
*/
Player.prototype.handleInput = function(keyCode) {
    if (controller.init) {
        if(keyCode== 'left') {
            // Checking to make sure player does not go off the canvas
            if (player.x-50>0) {
                player.x-=101;
            }
        }
        else if(keyCode == 'up') {
            // Checking to make sure player does not go off the canvas
            // if (player.y-48>0) {
                player.y-=83;
            // }
        }
        else if(keyCode == 'right') {
            // Checking to make sure player does not go off the canvas
            if (player.x+105<505) {
                player.x+=101;
            }
        }
        else if(keyCode == 'down') {
            // Checking to make sure player does not go off the canvas
            if (player.y+240 <606) {
                player.y+=83;
            }
        }

    }

// If player reaches water restart session and updates score
    if(this.y < -12) {
        this.score++;
        this.restart();
        $("#score").text("Score: "+this.score);
    }


};

/**
* @description Put player back in starting position
*/
Player.prototype.restart = function(){
    this.x = this.pos[0];
    this.y = this.pos[1];
    if (this.life<1) {
        $("#life").text("Life: "+ this.life+" Game Over");
    } else {
        $("#life").text("Life: "+this.life);
    }
}

/**
* @description Executed continuously to generate enemies randomly
*/
function generateEnemiesTimer() {
    if (controller.init) {
        if(Math.random() < 0.2) {
            allEnemies.push(new Enemy(-101,207,30));
          }

        if(Math.random() < 0.3) {
            allEnemies.push(new Enemy(-101,124,30));
          }

        if(Math.random() < 0.1  ) {
            allEnemies.push(new Enemy(-101,41,30));
          }
    }


}

/**
* @description Instantiation of objects
*/
var allEnemies = [], player = new Player(200,400,30);
var controller = new Controller()

/**
* @description Count down of game time
*/
function countDown(time, elem) {
    var element = document.getElementById(elem);
    element.innerHTML = "Time: " + time;
    time--;
    controller.time = time;
    if (time<1) {
        clearTimeout(timer);
        clearInterval(controller.myVar);
        controller.init = false;
        player.restart();
        element.innerHTML = "Time Up, Game Over";

    }

    if (controller.init) {
        var timerx = setTimeout('countDown('+time+',"'+elem+'")', 1000);    

    }
}



// 
// Player.handleInput() method. You don't need to modify this.
/**
* @description This listens for key presses and sends the keys to your
* @param {string} keyup, A string representing the event type to listen for.
* @param {function} function(e), The object that receives a notification when an event of the specified type occurs. This must be an object implementing the EventListener interface, or simply a JavaScript function. 
*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
