
// Difficulty setting positively affects average bug
// speeds and number of bugs on canvas (plus 2).
var difficulty = 1;
console.log('Difficulty has been set to ' + difficulty);

function setDifficulty(level) {
    if (level > 0 && level < 11) {
        difficulty = parseInt(level);
        console.log('Difficulty has been set to ' + difficulty);
        console.log('Player points: ' + player.points);

        if (allEnemies.length !== difficulty + 2) {
            allEnemies = makeEnemies();
        }

        allGems = makeGems();

    } else {
        (alert('Difficulty must be between 1-10!'));
        setDifficulty(difficulty);
    }
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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 400);
console.log('Player points: ' + player.points);


var allEnemies = makeEnemies();

function makeEnemies() {
    var enemies  =[];
    for (var i = 1; i <= (2 + difficulty); i++)
        setTimeout(function () {
            enemies.push(new Enemy());
        }, Math.floor(Math.random() * 2000));
    return enemies;
}


var allGems = makeGems();

function makeGems() {
    var gems = [];
    for (var i = 0; i < Math.floor(Math.random() * difficulty) + 1; i++) {
        gems.push(new Gem());
    }
    return gems;
}

