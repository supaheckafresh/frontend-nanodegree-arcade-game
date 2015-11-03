// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.height = 171;
    this.width = 101;
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

    if (isOffCanvas(this)) {
        this.recycle();
    }

    function isOffCanvas(enemy) {
        return enemy.x > 500;
    }
};

// My algorithm to achieve less-smooth, wiggly, bug-like
// movement and range of speeds among enemies:
Enemy.prototype.wriggle = function (dt) {
    var varyEnemySpeed = Math.random() * 80;
    this.x += ((this.speed * dt) *
        varyEnemySpeed) +
        (Math.random() * (difficulty / 2));
};

Enemy.prototype.randomizeRow = function () {
    var rows = [60, 143, 226, 309];
    this.y = rows[Math.floor(Math.random() * 4)];
};

Enemy.prototype.randomizeSpeed = function () {
    this.speed = Math.floor(Math.random() * 5) + 1;
};

Enemy.prototype.recycle = function () {
    this.x = (Math.random() * -300) - 100;
    this.randomizeRow();
    this.randomizeSpeed();
};