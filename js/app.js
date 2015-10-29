// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;

    var rows = [60, 143, 226, 309];
    this.y = rows[Math.floor(Math.random() * 4)];

    this.speed = Math.floor(Math.random() * 5) + 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.crawl();
};

Enemy.prototype.crawl = function () {
    var speedWithVariancePerFrame = (Math.random() * this.speed) + 1;
    this.x += speedWithVariancePerFrame;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function (dt) {
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function () {
    var key = arguments[0];

    var vertMove = 83,
        latMove = 101;

    var upperBound = -14,
        lowerBound = 400,
        leftBound = -2,
        rightBound = 402;

    switch(key) {
        case 'up':
            if (this.y > upperBound)
                this.y -= vertMove;
                break;
        case 'down':
            if (this.y < lowerBound)
                this.y += vertMove;
                break;
        case 'left':
            if (this.x > leftBound)
                this.x -= latMove;
                break;
        case 'right':
            if (this.x < rightBound)
                this.x += latMove;
                break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 400);


var allEnemies = makeEnemies(4);

function makeEnemies(quantity) {
    var enemies  =[];
    for (var i = 1; i <= quantity; i++)
        enemies.push(new Enemy());
    return enemies;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
