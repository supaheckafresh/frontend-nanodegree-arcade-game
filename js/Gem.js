
var Gem = function () {

    this.sprite = [
        'images/gem-green.png',
        'images/gem-orange.png',
        'images/gem-blue.png']
        [Math.floor(Math.random() * 3)];

    this.y = [90, 173, 256, 339][Math.floor(Math.random() * 4)];
    this.x = [13, 113, 213, 313, 413][Math.floor(Math.random() * 5)];

    this.setPointsValue();
};


Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Gem.prototype.update = function (dt) {
    //TODO: try adding some animation when player collides with gems
};


Gem.prototype.setPointsValue = function () {
    switch (this.sprite) {
        case 'images/gem-green.png':
            this.pointsValue = 75;
            break;
        case 'images/gem-orange.png':
            this.pointsValue = 150;
            break;
        case 'images/gem-blue.png':
            this.pointsValue = 300;
            break;
    }
};


Gem.prototype.disappear = function () {
    allGems.splice(allGems.indexOf(this), 1);
};