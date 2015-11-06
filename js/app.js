
// Difficulty setting positively affects average bug
// speeds and number of bugs on canvas (plus 2).
var difficulty = 1;

function setDifficulty(level) {
    if (level > 0 && level < 11) {
        difficulty = parseInt(level);

        if (allEnemies.length !== difficulty + 2) {
            allEnemies = makeEnemies();
        }

        allGems = makeGems();

    } else {
        alert('Difficulty must be between 1-10!');
        setDifficulty(difficulty);
    }
}


var player = new Player();

var allEnemies = makeEnemies();

var allGems = makeGems();


function makeEnemies() {
    var enemies  =[];
    for (var i = 1; i <= (2 + difficulty); i++)

        // setTimeout used so enemies don't all appear at once.
        setTimeout(function () {
            enemies.push(new Enemy());
        }, Math.floor(Math.random() * 2000));

    return enemies;
}

function makeGems() {
    var gems = [];
    for (var i = 0; i < Math.floor(Math.random() * difficulty) + 1; i++) {
        gems.push(new Gem());
    }
    return gems;
}


document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

