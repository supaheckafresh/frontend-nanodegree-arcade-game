
//difficulty setting positively affects average bug speeds.
var difficulty = 1;

// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.randomizeRow();
    this.randomizeSpeed();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.wriggle(dt);
    this.recycle();
};

//My algorithm to achieve less-smooth, wiggly, bug-like movement and range of speeds among enemies:
Enemy.prototype.wriggle = function (dt) {
    var varyEnemySpeed = Math.random() * 80;
    this.x += ((this.speed * dt) *
        varyEnemySpeed) +
        (Math.random() * difficulty);
};

Enemy.prototype.randomizeRow = function () {
    var rows = [60, 143, 226, 309];
    this.y = rows[Math.floor(Math.random() * 4)];
};

Enemy.prototype.randomizeSpeed = function () {
    this.speed = Math.floor(Math.random() * 5) + 1;
};

Enemy.prototype.recycle = function () {
    if (this.x > 500) {
        this.x = -100;
        this.randomizeRow();
        this.randomizeSpeed();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (startX, startY) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = startX;
    this.y = startY;
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


var allEnemies = makeEnemies();

function makeEnemies() {
    var enemies  =[];
    for (var i = 1; i <= (2 + difficulty); i++)
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
