var Player = function (startX, startY) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = startX;
    this.y = startY;
    this.height = 171;
    this.width = 101;
    this.alive = true;
    this.speed = 600;
    this.direction = null;
    this.move = false;
    this.points = 0;
    this.lastPosition = {x: this.x, y: this.y};
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function (dt) {
    var verticalMove = 80,
        lateralMove = 95;

    var topBoundary = -14,
        bottomBoundary = 400,
        leftBoundary = -2,
        rightBoundary = 402;

    if (this.move){

        if (this.direction === 'up'
            && Math.floor(this.y) > topBoundary) {

            this.upAnimate(dt, verticalMove);

            if (hasReachedWater(this)) {

                this.stop();
                this.advanceLevel();
            }

        } else if (this.direction === 'down'
            && Math.ceil(this.y) < bottomBoundary) {

            this.downAnimate(dt, verticalMove);

        } else if (this.direction === 'left'
            && Math.floor(this.x) > leftBoundary) {

            this.leftAnimate(dt, lateralMove);

        } else if (this.direction === 'right'
            && Math.floor(this.x) < rightBoundary) {

            this.rightAnimate(dt, lateralMove);
        }
    }

    function hasReachedWater(player) {
        return player.y <= -10;
    }

    if (this.alive === true) {
        this.checkForCollisions();
    }

    if (this.alive === false) {
        this.restart();
    }
};

Player.prototype.upAnimate = function (dt, verticalMove) {
    this.y -= this.speed * dt;
    if (this.y <= this.lastPosition['y'] - verticalMove) {
        this.stop();
    }
};

Player.prototype.downAnimate = function (dt, verticalMove) {
    this.y += this.speed * dt;
    if (this.y >= this.lastPosition['y'] + verticalMove) {
        this.stop();
    }
};

Player.prototype.leftAnimate = function (dt, lateralMove) {
    this.x -= this.speed * dt;
    if (this.x <= this.lastPosition['x'] - lateralMove) {
        this.stop();
    }
};

Player.prototype.rightAnimate = function (dt, lateralMove) {
    this.x += this.speed * dt;
    if (this.x >= this.lastPosition['x'] + lateralMove) {
        this.stop();
    }
};

//TODO player.die() gets executed multiple times if player collides with more than one enemy at the same time. Maybe fix.

//TODO (separate from above) - refactor the collision code. There is duplication & doesn't seem very robust as is.
Player.prototype.checkForCollisions = function () {
    var player = this;

    var playerTopOffset = 90,
        playerBottomOffset = 40,
        playerSideOffset = 17;

    var playerLeftEdge = this.x + playerSideOffset,
        playerRightEdge = this.x + this.width - playerSideOffset,
        playerTopEdge = this.y + playerTopOffset,
        playerBottomEdge = this.y + this.height - playerBottomOffset;

    allEnemies.some(function (enemy) {

        var enemyTopOffset = 78,
            enemyBottomOffset = 28,
            enemySideOffset = 2;

        var enemyLeftEdge = enemy.x + enemySideOffset,
            enemyRightEdge = enemy.x + enemy.width - enemySideOffset;


        if (hasCollided()) {

            player.die();

        }

        function hasCollided() {

            if (playerLeftEdge >= enemyLeftEdge && playerLeftEdge <= enemyRightEdge
                || playerRightEdge >= enemyLeftEdge && playerRightEdge <= enemyRightEdge) {

                var enemyTopEdge = enemy.y + enemyTopOffset,
                    enemyBottomEdge = enemy.y + enemy.height - enemyBottomOffset;

                if (playerTopEdge >= enemyTopEdge && playerTopEdge <= enemyBottomEdge
                    || playerBottomEdge >= enemyTopEdge && playerBottomEdge <= enemyBottomEdge) {

                    return true;
                }
            }
        }
    });


    allGems.forEach(function (gem) {

        var gemLeftEdge = gem.x,
            gemRightEdge = gem.x + 75;

        if (playerLeftEdge >= gemLeftEdge && playerLeftEdge <= gemRightEdge
            || playerRightEdge >= gemLeftEdge && playerRightEdge <= gemRightEdge) {

            var gemTopEdge = gem.y + 40,
                gemBottomEdge = gem.y + 86;

            if (playerTopEdge >= gemTopEdge && playerTopEdge <= gemBottomEdge
                || playerBottomEdge >= gemTopEdge && playerBottomEdge <= gemBottomEdge) {

                player.points += gem.pointsValue;

                console.log('Player points: ' + player.points);

                gem.disappear();
            }
        }

    });
};

Player.prototype.die = function () {
    this.alive = false;
    alert('OH NO!! GAME OVER.');
};

Player.prototype.restart = function () {
    this.stop();
    this.alive = true;
    this.x = 200;
    this.y = 400;
    this.lastPosition = {x: 200, y: 400};
    this.points = 0;

    setDifficulty(2);

    allEnemies.forEach(function (enemy) {
        enemy.recycle();
    })
};

Player.prototype.advanceLevel = function () {
    this.lastPosition = {x: 200, y: 400};

    if (difficulty === 10) {
        alert("YOU WON! GAME OVER!");

    } else {
        alert("LEVEL " + difficulty + " COMPLETED!");
        this.points += 75 * difficulty;

        setDifficulty(++difficulty);
        this.x = 200;
        this.y = 400;
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
    this.lastPosition = {x: this.x, y: this.y};
};