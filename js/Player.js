
var Player = function () {
    this.sprite = 'images/char-cat-girl.png';
    this.moveToStartingSquare();

    this.alive = true;
    this.points = 0;
    this.lastPosition = this.setLastPosition();

    this.speed = 600;
    this.direction = null;
    this.move = false;

    this.height = 171;
    this.width = 101;
};


Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.update = function (dt) {
    var VERTICAL_MOVE = 80,
        LATERAL_MOVE = 100;

    var TOP_BOUNDARY = -14,
        BOTTOM_BOUNDARY = 400,
        LEFT_BOUNDARY = 0,
        RIGHT_BOUNDARY = 400;

    if (this.move){

        if (this.direction === 'up' && Math.floor(this.y) > TOP_BOUNDARY) {
            this.upAnimate(dt, VERTICAL_MOVE);

            if (hasReachedWater(this)) {

                this.stop();
                this.advanceLevel();
            }

        } else if (this.direction === 'down' && Math.ceil(this.y) < BOTTOM_BOUNDARY) {
            this.downAnimate(dt, VERTICAL_MOVE);

        } else if (this.direction === 'left' && Math.floor(this.x) > LEFT_BOUNDARY) {
            this.leftAnimate(dt, LATERAL_MOVE);

        } else if (this.direction === 'right' && Math.floor(this.x) < RIGHT_BOUNDARY) {
            this.rightAnimate(dt, LATERAL_MOVE);
        }
    }

    function hasReachedWater(player) {
        return player.y <= -15;
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
        this.alignInSquare();
    }
};


Player.prototype.downAnimate = function (dt, verticalMove) {
    this.y += this.speed * dt;
    if (this.y >= this.lastPosition['y'] + verticalMove) {
        this.stop();
        this.alignInSquare();
    }
};


Player.prototype.leftAnimate = function (dt, lateralMove) {
    this.x -= this.speed * dt;
    if (this.x <= this.lastPosition['x'] - lateralMove) {
        this.stop();
        this.alignInSquare();
    }
};


Player.prototype.rightAnimate = function (dt, lateralMove) {
    this.x += this.speed * dt;
    if (this.x >= this.lastPosition['x'] + lateralMove) {
        this.stop();
        this.alignInSquare();
    }
};


Player.prototype.handleInput = function () {

    var key = arguments[0];

    if (key) {
        this.setLastPosition();
    }

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


// TODO: refactor the collision code. Works, but there is duplication & maybe could be more robust.
Player.prototype.checkForCollisions = function () {
    var player = this;

    var PLAYER_TOP_OFFSET = 90,
        PLAYER_BOTTOM_OFFSET = 40,
        PLAYER_SIDE_OFFSET = 17;

    var playerLeftEdge = this.x + PLAYER_SIDE_OFFSET,
        playerRightEdge = this.x + this.width - PLAYER_SIDE_OFFSET,
        playerTopEdge = this.y + PLAYER_TOP_OFFSET,
        playerBottomEdge = this.y + this.height - PLAYER_BOTTOM_OFFSET;

    allEnemies.some(function (enemy) {

        var ENEMY_TOP_OFFSET = 89,
            ENEMY_BOTTOM_OFFSET = 34,
            ENEMY_SIDE_OFFSET = 11;

        var enemyLeftEdge = enemy.x + ENEMY_SIDE_OFFSET,
            enemyRightEdge = enemy.x + enemy.width - ENEMY_SIDE_OFFSET;


        if (hasCollided()) {

            player.die();
            return true;

        }

        function hasCollided() {

            if (playerLeftEdge >= enemyLeftEdge && playerLeftEdge <= enemyRightEdge
                || playerRightEdge >= enemyLeftEdge && playerRightEdge <= enemyRightEdge) {

                var enemyTopEdge = enemy.y + ENEMY_TOP_OFFSET,
                    enemyBottomEdge = enemy.y + enemy.height - ENEMY_BOTTOM_OFFSET;

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
    this.moveToStartingSquare();
    this.setLastPosition();
    this.points = 0;

    setDifficulty(1);

    allEnemies.forEach(function (enemy) {
        enemy.recycle();
    })
};


Player.prototype.advanceLevel = function () {

    if (difficulty === 10) {
        alert('YOU WON! GAME OVER!');
        this.points += 150 * difficulty; //BIG BONUS!!

    } else {
        alert('LEVEL ' + difficulty + ' COMPLETED!');
        this.points += 75 * difficulty;

        setDifficulty(++difficulty);
        this.moveToStartingSquare();
        this.setLastPosition();
    }
};


Player.prototype.stop = function () {
    this.direction = null;
    this.move = false;
};


Player.prototype.alignInSquare = function () {
    var allowedRows = [-15, 70, 152, 236, 319, 400],
        allowedColumns = [0, 100, 200, 300, 400];

    this.x = allowedColumns[Math.abs(Math.round(player.x / 100))];

    this.y = allowedRows[Math.abs(Math.round(player.y / 82))];
};


Player.prototype.moveToStartingSquare = function () {
    this.x = 200;
    this.y = 400;
};


Player.prototype.setLastPosition = function () {
    this.lastPosition = {x: this.x, y: this.y};
};