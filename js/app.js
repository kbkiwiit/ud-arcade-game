// Create the enemies for the player to avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy sprites so that they move at random speeds.
Enemy.prototype.update = function(dt) {
    this.x = this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
        this.speed = 50 + Math.floor(Math.random() * 100);
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.horiz = 101;
    this.vert = 83;
    this.startH = this.horiz * 2;
    this.startV = (this.vert * 5) - 20;
    this.x = this.startH;
    this.y = this.startV;
};

// Move player around and set boundaries
Player.prototype.handleInput = function(dt) {
    switch (dt) {
        case "up":
            if (this.y > 0) {
                this.y -= this.vert;
            }
            break;
        case "down":
            if (this.y < this.vert * 4) {
                this.y += this.vert;
            }    
            break;
        case "left":
            if (this.x > 0) {
                this.x -= this.horiz;
            }
            break;
        case "right":
            if (this.x < this.horiz * 4) {
                this.x += this.horiz;
            }
            break;
    }
};

// Update player sprite and detect collisions.
Player.prototype.update = function(dt) {
    // Detect collisions
    for (let e of allEnemies) {
        let dtx = this.x - e.x - 15;
        let dty = this.y - e.y -20;
        let collision = Math.sqrt(dtx * dtx + dty * dty);
        if (collision < 56) {
            this.reset();
        }
    }
        // Notify of win and reset player position
        if (this.y === - 20) {
            alert('Congratulations, you made it! Click OK to play again.')
            this.reset();
        }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Resetting the player to starting position
Player.prototype.reset = function() {
    this.x = this.startH;
    this.y = this.startV;
}

//Instantiate enemy and player objects
var allEnemies = [new Enemy(-200, 65, 100), new Enemy(-150, 145, 80), new Enemy(-100, 230, 120)];

var player = new Player();

// Listener for key inputs for player.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
