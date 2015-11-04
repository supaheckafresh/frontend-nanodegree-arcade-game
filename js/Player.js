var Player = function (startX, startY) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = startX;
    this.y = startY;
    this.height = 171;
    this.width = 101;
    this.alive = true;
    this.speed = 5;
    this.direction = null;
    this.animateMove = false;
    this.points = 0;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function (dt) {
    var newLocation;

    var verticalMove = 83,
        lateralMove = 101;

    var topBoundary = -14,
        bottomBoundary = 400,
        leftBoundary = -2,
        rightBoundary = 402;

    if (this.animateMove){

        if (this.direction === 'up'
            && Math.floor(this.y) > topBoundary) {
            newLocation = this.y - verticalMove;
            while (this.y > newLocation) {
                this.y -= this.speed * dt;
            }
            this.stop();

            if (hasReachedWater(this)) {
                level.won = true;
            }

        } else if (this.direction === 'down'
            && Math.ceil(this.y) < bottomBoundary) {
            newLocation = this.y + verticalMove;
            while (this.y < newLocation) {
                this.y += this.speed * dt;
            }
            this.stop();

        } else if (this.direction === 'left'
            && Math.floor(this.x) > leftBoundary) {
            newLocation = this.x - lateralMove;
            while (this.x > newLocation) {
                this.x -= this.speed * dt;
            }
            this.stop();

        } else if (this.direction === 'right'
            && Math.floor(this.x) < rightBoundary) {
            newLocation = this.x + lateralMove;
            while (this.x < newLocation) {
                this.x += this.speed * dt;
            }
            this.stop();
        }
    }

    function hasReachedWater(player) {
        return player.y <= 14;
    }

    if (this.alive === true) {
        this.checkForCollisions();
    }

    if (this.alive === false) {
        this.restart();
    }

    if (level.won === true) {
        var player = this;
        //TODO this setTimeout allows player to appear in water before alert. Not sure how to do without it.
        setTimeout(function () {

            player.advanceLevel()

        }, 1);
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
            //TODO Enclosing die() in setTimeout seems to eliminate multiple alerts. Better way?
            setTimeout(function () {

                player.die();

            }, 1);
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
    player.alive = true;
    player.x = 200;
    player.y = 400;
    player.points = 0;

    setDifficulty(2);

    allEnemies.forEach(function (enemy) {
        enemy.recycle();
    })
};

Player.prototype.advanceLevel = function () {
    if (difficulty === 10) {
        alert("YOU WON! GAME OVER!");

    } else {
        alert("LEVEL " + difficulty + " COMPLETED!");
        this.points += 75 * difficulty;

        setDifficulty(++difficulty);
        this.x = 200;
        this.y = 400;
    }

    level.won = false;
};

Player.prototype.handleInput = function () {

    var key = arguments[0];

    switch(key) {
        case 'up':
            this.direction = 'up';
            this.animateMove = true;
            break;
        case 'down':
            this.direction = 'down';
            this.animateMove = true;
            break;
        case 'left':
            this.direction = 'left';
            this.animateMove = true;
            break;
        case 'right':
            this.direction = 'right';
            this.animateMove = true;
            break;
    }
};

Player.prototype.stop = function () {
    this.direction = null;
    this.animateMove = false;
};