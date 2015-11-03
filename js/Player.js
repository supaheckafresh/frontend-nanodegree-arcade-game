var Player = function (startX, startY) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = startX;
    this.y = startY;
    this.height = 171;
    this.width = 101;
    this.alive = true;
    this.speed = 1;
    this.direction = null;
    this.move = false;
    this.points = 0;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function (dt) {
    var lastLocation;

    var verticalMove = 83,
        lateralMove = 101;

    var topBoundary = -14,
        bottomBoundary = 400,
        leftBoundary = -2,
        rightBoundary = 402;

    if (this.move){
        if (this.direction === 'up'
            && Math.floor(this.y) > topBoundary) {
            lastLocation = this.y;
            while (this.y > lastLocation - verticalMove) {
                this.y -= this.speed * dt;
            }
            this.stop();


            //TODO used setTimeout to allow player to complete final move before alert and restart. Better way?
            var player = this;
            setTimeout(function () {
                player.checkIfLevelComplete();
            }, 1);


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

    if (this.alive === true) {
        this.checkForCollision();
    }

    if (this.alive === false) {
        this.restart();
    }
};

//TODO player.die() gets executed multiple times if player collides with more than one enemy at the same time. Fix.

//TODO (separate from above) - refactor the collision code. There is duplication & doesn't seem very robust as is.
Player.prototype.checkForCollision = function () {
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

Player.prototype.checkIfLevelComplete = function () {
    if (this.y <= -14) {
        if (difficulty === 10) {
            alert("YOU WON! GAME OVER!");

        } else {
            alert("LEVEL " + difficulty + " COMPLETED!");
            this.points += 75 * difficulty;

            setDifficulty(++difficulty);
            this.x = 200;
            this.y = 400;
        }
    }
};