/* The correct way to bone up on JavaScript, is to make a text based game.
 * Author: Bernard Helyer <b.helyer@gmail.com> @bhelyer on twitter.
 */

var Direction = {
	NONE:0,
	UP:1,
	RIGHT:2,
	DOWN:3,
	LEFT:4
}

var Game = { 
	fps:12,
	width:80,   // Playing-field width in characters.
	height:25,  // Playing-field height in characters.
	segments:[],
	current_direction:Direction.NONE,
	gold:{x:-1, y:-1},
	score:0,
	highscore:0,
	over:false
}

Game.reset = function() {
	Game.gold.x = Game.gold.y = -1;
	Game.segments = [];
	Game.segments.push({
		x:Math.floor(Game.width / 2),
		y:Math.floor(Game.height / 2)
	});
	Game.current_direction = Direction.NONE;
	Game.score = 0;
	Game.over = false;
}

Game.reset();

Game.grow = function() {
	Game.score += 1000 * Game.segments.length;
	var len = Game.segments.length;
	var segment = { x:Game.segments[len - 1].x, y:Game.segments[len - 1].y }
	Game.segments.push(segment);
}

/**
 * Returns true if a segment is on the given coordinates.
 * An incredibly brain-dead way of doing this, true, but it should be okay for the N we're dealing with.
 */
Game.hit_segment = function(x, y, init) {
	init = init || 0;
	for (var i = init, segment; segment = Game.segments[i++];) {
		if (segment.x == x && segment.y == y) {
			return true;
		}
	}
	return false;
}

Game.spawn_gold = function() {
	var x = Game.segments[0].x;
	var y = Game.segments[0].y;
	while (Game.hit_segment(x, y)) {
		x = Math.floor(Math.random() * (Game.width - 2) + 1);
		y = Math.floor(Math.random() * (Game.height - 2) + 1);
	}
	Game.gold.x = x;
	Game.gold.y = y;
}

Game.input = function(event) {
	switch (event.keyCode) {
	case 38: Game.current_direction = Direction.UP; break;
	case 39: Game.current_direction = Direction.RIGHT; break;
	case 40: Game.current_direction = Direction.DOWN; break;
	case 37: Game.current_direction = Direction.LEFT; break;
	case 82: if (Game.over) Game.reset(); break;
	default: break;
	}
}

function getTarget(direction, location) {
	var target = { x:location.x, y:location.y }
	switch (Game.current_direction) {
	case Direction.NONE:
	default:
		break;
	case Direction.UP: target.y -= 1; break;
	case Direction.RIGHT: target.x += 1; break;
	case Direction.DOWN: target.y += 1; break;
	case Direction.LEFT: target.x -= 1; break;
	}
	return target;
}

Game.update = function() {
	if (Game.over) {
		return;
	}
	if (Game.current_direction != Direction.NONE) {
		Game.score += Game.segments.length;
	}
	if (Game.gold.x < 0 || Game.gold.y < 0) {
		Game.spawn_gold();
	}
	var target = getTarget(Game.current_direction, Game.segments[0]);
	for (var i = 0, len = Game.segments.length; i < len; i++) {
		var segment = Game.segments[i];
		var new_target = { x:segment.x, y:segment.y }
		if (target.x > segment.x) {
			segment.x += 1;
		} else if (target.x < segment.x) {
			segment.x -= 1;
		}
		if (target.y > segment.y) {
			segment.y += 1;
		} else if (target.y < segment.y) {
			segment.y -= 1;
		}
		target = new_target;
	}
	var px = Game.segments[0].x;
	var py = Game.segments[0].y;
	if (px == Game.gold.x && py == Game.gold.y) {
		Game.grow();
		Game.gold.x = -1;
		Game.gold.y = -1;
	} else if ((Game.segments.length > 1 && Game.hit_segment(px, py, 1)) || 
			   (px <= 0 || px >= Game.width - 1 || py <= 0 || py >= Game.height - 1)) {
		Game.over = true;
	}
	if (Game.score > Game.highscore) {
		Game.highscore = Game.score;
	}
}

Game.draw = function() {
	var game_over_i = 0;
	var field = "";
	for (var row = 0; row < Game.height; row++) {
		for (var col = 0; col < Game.width; col++) {
			if (Game.hit_segment(col, row)) {
				field += Game.over ? "X" : "@";
			} else if (row == 0 || row == (Game.height - 1) ||
				col == 0 || col == (Game.width - 1)) {
				field += "#";
			} else if (row == Game.gold.y && col == Game.gold.x) {
				field += "$";
			} else {
				if (!Game.over) {
					field += ".";
				} else {
					field += "GAME OVER "[game_over_i++];
					if (game_over_i >= "GAME OVER ".length) {
						game_over_i = 0;
					}
				}
			}
		}
		if (row == 0) {
			field += " High Score : " + Game.highscore;
		} else if (row == 2) {
			field += " Score      : " + Game.score;
		} else if (row == 3) {
			field += " Length     : " + Game.segments.length;
		} else if (row == 4 && Game.over) {
			field += " PRESS R TO START A NEW GAME";
		}
		field += "\n";
	}
	document.body.innerHTML = "<pre>" + field + "</pre>";
}
 
Game.run = function() {
	Game.update();
	Game.draw();
}

Game._intervalId = setInterval(Game.run, 1000 / Game.fps);
document.addEventListener("keydown", Game.input);
