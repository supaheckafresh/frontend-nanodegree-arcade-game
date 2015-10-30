
// Difficulty setting positively affects average bug
// speeds and number of bugs on canvas (plus 2).
var difficulty = 2;
console.log("Difficulty has been set to " + difficulty);

function setDifficulty(level) {
    if (level > 0 && level < 10) {
        difficulty = parseInt(level);
        console.log("Difficulty has been set to " + difficulty);

        if (allEnemies.length !== difficulty + 2) {
            allEnemies = makeEnemies();
        }
    } else {
        (alert("Difficulty must be between 1-10!"));
        setDifficulty(difficulty);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (startX, startY) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = startX;
    this.y = startY;
    this.speed = 1;

    this.direction = null;
    this.move = false;
};

Player.prototype.render = function () {ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function (dt) {
    var lastLocation;
    var verticalMove = 83,
        lateralMove = 101;
    var topBoundary = -14,
        bottomBoundary = 400,
        leftBoundary = -2,
        rightBoundary = 402;

    //TODO ensure move is complete before new move is allowed.
    if (this.move){
        if (this.direction === 'up'
            && Math.floor(this.y) > topBoundary) {
            lastLocation = this.y;
            while (this.y > lastLocation - verticalMove) {
                this.y -= this.speed * dt;
            }
            this.stop();
        } else if (this.direction === 'down'
            && Math.ceil(this.y) < bottomBoundary) {
            lastLocation = this.y;
            while (this.y < lastLocation + verticalMove) {
                this.y += this.speed * dt;
            }
            this.stop();
        } else if (this.direction === 'left'
            && Math.floor(this.x) > leftBoundary) {
            lastLocation = this.x;
            while (this.x > lastLocation - lateralMove) {
                this.x -= this.speed * dt;
            }
            this.stop();
        } else if (this.direction === 'right'
            && Math.floor(this.x) < rightBoundary) {
            lastLocation = this.x;
            while (this.x < lastLocation + lateralMove) {
                this.x += this.speed * dt;
            }
            this.stop();
        }
    }
};

Player.prototype.handleInput = function () {

    var key = arguments[0];

    switch(key) {
        case 'up':
            this.direction = 'up';
            this.move = true;
            break;
        case 'down':
            this.direction = 'down';
            this.move = true;
            break;
        case 'left':
            this.direction = 'left';
            this.move = true;
            break;
        case 'right':
            this.direction = 'right';
            this.move = true;
            break;
    }
};

Player.prototype.stop = function () {
    this.direction = null;
    this.move = false;
};

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

// My algorithm to achieve less-smooth, wiggly, bug-like
// movement and range of speeds among enemies:
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
        this.x = (Math.random() * -300) - 100;
        this.randomizeRow();
        this.randomizeSpeed();
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
        setTimeout(function () {
            enemies.push(new Enemy());
        }, Math.floor(Math.random() * 2000));
    return enemies;
}
