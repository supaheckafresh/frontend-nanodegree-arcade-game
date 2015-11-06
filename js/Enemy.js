
var Enemy = function () {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;

    this.randomizeRow();
    this.randomizeSpeed();

    this.height = 171;
    this.width = 101;
};


Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.update = function (dt) {

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