var MSG_NONE = -1;
var MSG_NO_WALK  = 0;
var MSG_LANGUAGE = 1;
var MSG_CURRENTLANGUAGE = 2;
var MSG_RETURNTOINDEX = 3;
var MSG_OPPOSITELANGUAGE = 4;
var MSG_FAIL_DOGROUND = 5;
var MSG_CLIMB = 6;
var MSG_INTRO = 7;
var MSG_SEEKERDESC = 8;
var MSG_PLAYERDESC = 9;
var MSG_A_MOANS = 10;
var MSG_SEEKER = 11;
var MSG_FLOOR = 12;
var MSG_HP = 13;
var MSG_STR = 14;
var MSG_DEF = 15;
var MSG_A_ATTACKS_B = 16;
var MSG_YOU = 17;
var MSG_A_RECEIVES_B_DMG = 18;
var MSG_A_DODGES = 19;
var MSG_A_DIES = 20;
var MSG_OAKEN_HEART = 21;
var MSG_A_IS_HERE = 22;  // Inanimate.
var MSG_A_PICKS_UP_B = 23;
var MSG_EMPTY = 24;

var MessageLanguage = {
	ENGLISH:0,
	JAPANESE:1
}

var MessageStrings = {
	language:MessageLanguage.ENGLISH
}

var E_INTRO =
"\
<p>'Endless Tower', scholars are quick to point out, is a crude rendering \
from the Seekers' long dead language. \
A better translation, they say, would be 'Tower to the Endless'. \
</p><p>\
Nevertheless, no one has ever reached the top.</p>\
";
var J_INTRO =
"\
<p>「シーカーの古い死語から『エンドレスなタワー』は雑な翻訳だよ」と学者が早く言います。\
より良い翻訳は、「終焉へのタワー」だというのです。\
</p><p>\
しかし、誰一人タワーの頂上に到達した者はいません。</p>\
";

var E_SEEKER =
"\
<p>Robed in white, face shrouded. It shuffles towards you. \
This is a Seeker. Like you they sought answers. Now they are \
mere thralls to the tower, and see you as an infection to be purged.</p>\
";
var J_SEEKER =
"\
<p>顔まで覆われたローブを着た人が近づいてきりました。\
これはシーカーです。あなたごとき、答えを探しました。\
今タワーに捕らわれます。シーカーが感染とする。</p>\
";

MessageStrings.toggleLanguage = function() {
	if (this.language === MessageLanguage.ENGLISH) {
		this.language = MessageLanguage.JAPANESE;
	} else {
		this.language = MessageLanguage.ENGLISH;
	}
}

MessageStrings.drawOptions = function() {
	document.getElementById("langbutton").innerHTML = this.get(MSG_OPPOSITELANGUAGE);
	document.getElementById("return").innerHTML = this.get(MSG_RETURNTOINDEX);
}

MessageStrings.get = function(id, a, b) {
	var l = this.language;
	var e = MessageLanguage.ENGLISH;
	var j = MessageLanguage.JAPANESE;
	function verb(s, ch) {
		if (typeof(ch) === "undefined") {
			ch = " ";
		}
		return " " + s + (a === MSG_YOU ? ch : "s" + ch);
	}
	function an(s) {
		if (s[0] === "a" || s[0] === "e" || s[0] === "i" || s[0] === "o" || s[0] == "u") {
			return "an " + s;
		} else {
			return "a " + s;
		}
	}
	function span(str, className) {
		return "<span class=\"" + className + "\">" + str + "</span>";
	}
	switch (id) {
	case MSG_NONE: throw new Error("MessageStrings.get: Tried to retrieve MSG_NONE.");
	case MSG_NO_WALK: return ((l == e) ? "You cannot walk there." : "あなたはそこに歩けない。");
	case MSG_LANGUAGE: return (l == e) ? "Language" : "言語";
	case MSG_CURRENTLANGUAGE: return (l == j) ? "日本語" : "English";
	case MSG_OPPOSITELANGUAGE: return (l == j) ? "English" : "日本語";
	case MSG_RETURNTOINDEX: return (l == e) ? "Return to index." : "インデックスへ戻る。";
	case MSG_FAIL_DOGROUND: return (l == e) ? "There's nothing here." : "ここにない。";
	case MSG_CLIMB: return (l == e) ? "You climb the stairs." : "あなたは階段に上る。"
	case MSG_INTRO: return (l == e) ? E_INTRO : J_INTRO;
	case MSG_SEEKERDESC: return (l == e) ? E_SEEKER : J_SEEKER;
	case MSG_PLAYERDESC: return (l == e) ? "Who are you?" : "あなたは誰ですか？";
	case MSG_A_MOANS: return (l == e) ? cap(this.get(a)) + " moans." : this.get(a) + "が唸る。";
	case MSG_SEEKER: return (l == e) ? "the Seeker" : "シーカー";
	case MSG_FLOOR: return (l == e) ? "Floor" : "階段";
	case MSG_HP: return (l == e) ? "Vitality" : "体力";
	case MSG_STR: return (l == e) ? "Strength" : "筋力";
	case MSG_DEF: return (l == e) ? "Defence" : "防御力";
	case MSG_A_ATTACKS_B: return (l == e) ? cap(this.get(a)) + verb("attack") + this.get(b) + "." : this.get(a) + "が" + this.get(b) + "を攻撃する。"
	case MSG_YOU: return (l == e) ? "you" : "あなた";
	case MSG_A_RECEIVES_B_DMG:
		var dmg = span(b, (a === MSG_YOU) ? "playerdmg" : "enemydmg");
		return (l == e) ?
			cap(this.get(a)) + verb("receive") + dmg + " damage." :
			this.get(a) + "が" + dmg + "ダメージを受ける。";
	case MSG_A_DODGES: return (l == e) ? "But " + this.get(a) + verb("dodge", ".") : "でも、" + this.get(a) + "がかわす。";
	case MSG_A_DIES: return (a == MSG_YOU ? '<span id="playerdeath">' : '<span>') + ((l == e) ? cap(this.get(a)) + verb("die", ".") :　this.get(a) + "が死ぬ。") + "</span>";
	case MSG_OAKEN_HEART: return (l == e) ? "oaken heart" : "オークの心臓";
	case MSG_A_IS_HERE: return (l == e) ? (cap(an(this.get(a))) + " is here.") : this.get(a) + "がここにある。";
	case MSG_A_PICKS_UP_B: return (l == e) ? cap(this.get(a)) + " " + verb("pick") + " up " + an(this.get(b)) + "." : this.get(a) + "は" + this.get(b) + "を拾う。";
	case MSG_EMPTY: return (l == e) ? "The inventory is empty." : "インベントリが空だよ。";
	}
}

MessageStrings.getStatus = function(floor, p) {
	var l = this.language;
	function getFloor() {
		if (l === MessageLanguage.JAPANESE) {
			return floor + 1;
		} else {
			if (floor === 0) {
				return "G";
			} else {
				return floor;
			}
		}
	}
	return '<span class="unit">' + this.get(MSG_FLOOR) + '</span>:' + getFloor() +
			' <span class="unit">' + this.get(MSG_HP) + '</span>:' + p.hp + "/" + p.maxHp +
			' <span class="unit">' + this.get(MSG_STR) + '</span>:' + p.str +
			' <span class="unit">' + this.get(MSG_DEF) + '</span>:' + p.def;
	var t = this;
}
/*
 * Attributes of tiles that don't change.
 * Colours are handled in the CSS.
 */
var TileAttrs = {
	floor: { walkable:true, transparent: true, c: "." },
	wall: { walkable:false, transparent: false, c: "#" },
	stairsup: { walkable:true, transparent: true, c: "<" }
}

function Tile(id, x, y) {
	this.id = id;
	this.creature = null;
	this.items = new Array();
	this.x = x;
	this.y = y;
}

function addCreature(dungeon, tile, creature) {
	dungeon.creatures.push(creature);
	tile.creature = creature;
	creature.x = tile.x;
	creature.y = tile.y;
	creature.dungeon = dungeon;
	if (creature.id === "player") {
		creature.fov = new FovMap(dungeon);
	}
}

function addItem(dungeon, tile, item) {
	tile.items.push(item);
}// Return a random integer in the range min .. max.
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/*
 * Call fn(x, y) for every point in (x0, y0) to (x1, y1).
 * If fn returns false, no more calls will be made.
 */
function line(x0, y0, x1, y1, fn) {
	var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = (dx > dy ? dx : -dy) / 2;

	while (fn(x0, y0)) {
		if (x0 === x1 && y0 === y1) {
			break;
		}
		var e2 = err;
		if (e2 > -dx) {
			err -= dy;
			x0 += sx;
		}
		if (e2 < dy) {
			err += dx;
			y0 += sy;
		}
	}
}

// Get parameters from the URL. Taken from StackOverflow, naturally.
function getQueryParams(qs) {
	qs = qs.split("+").join(" ");

	var params = {}, tokens,
		re = /[?&]?([^=]+)=([^&]*)/g;

	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])]
			= decodeURIComponent(tokens[2]);
	}

	return params;
}

// Capitalise the first letter of a string.
function cap(s) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}
/*
 * Creates a die or dice with a given die string.
 *   'd6' or '1d6'  one six sided die, 1-6
 *   '2d3' two three sided dice 1-3 + 1-3
 *   '1d20+2' one twenty sided die, +2 to the result.
 *   '3d6-5' three six sided dice, -5 to the result. (1-6 + 1-6 + 1-6) - 5
 */
function Dice(str) {
	var d = new Object();
	var strs = str.split("d");
	if (strs[0].length === 0) {
		strs[0] = "1";
	}
	d.numberOfDice = parseInt(strs[0], 10);
	if (strs[1].indexOf("+") != -1) {
		d.modifier = parseInt(strs[1].substr(strs[1].indexOf("+")+1), 10);
	} else if (strs[1].indexOf("-") != -1) {
		d.modifier = parseInt(strs[1].substr(strs[1].indexOf("-")), 10);
	} else {
		d.modifier = 0;
	}
	d.sides = parseInt(strs[1], 10);

	d.roll = diceRoll;

	return d;
}

function diceRoll() {
	var sum = 0;
	for (var i = 0, len = this.numberOfDice; i < len; ++i) {
		sum += getRandomInt(1, this.sides + 1);
	}
	return sum + this.modifier;
}
var ItemAttrs = {
	oaken_heart: { c:";", name:MSG_OAKEN_HEART }
}

function Item(id) {
	if (ItemAttrs[id] === undefined) {
		throw new Error("Item(): Unknown item id: " + id);
	}
	this.id = id;
	this.name = ItemAttrs[id].name;
}
var CreatureAttrs = {
	player: { c:"@", name:MSG_YOU, sightRange:5, initialMaxHP:"3d10+2", initialStrength:"2d6", initialDefence:"d6" },
	seeker: { c:"s", name:MSG_SEEKER, sightRange:7, initialMaxHP:"2d6+2",  initialStrength:"d6+1", initialDefence:"d4" }
}

function seekAi() {
	var t = this;
	var tile = this.dungeon.tileAt(this.x, this.y);
	if (tile.items.length > 0) {
			this.actions.push(new Action("doground", this.x, this.y));
			return;
	}
	var seen = this.canSee(Game.player);
	if (seen && !this.seenPlayer) {
		Log.add(function() { return MessageStrings.get(MSG_A_MOANS, t.name); });
	}
	if (seen) {
		var c = this
		var firstStep = true;
		function moveTowardsPlayer(x, y) {
			if (firstStep) {
				firstStep = false;
				return true;
			}
			c.actions.push(new Action("move", c.x, c.y, x, y));
			return false;
		}
		line(c.x, c.y, Game.player.x, Game.player.y, moveTowardsPlayer);
	}
	this.seenPlayer = seen;
}

function creatureCanSee(location) {
	var result = true;
	var c = this;
	var range = CreatureAttrs[c.id].sightRange;
	function fn(x, y) {
		range--;
		if (range < 0) {
			return result = false;
		}
		var t = c.dungeon.tileAt(x, y);
		if (!TileAttrs[t.id].transparent) {
			if (x === location.x && y === location.y) {
				result = true;
				return false;
			} else {
				return result = false;
			}
		}
		return true;
	}

	line(this.x, this.y, location.x, location.y, fn);
	return result;
}

function creatureDie() {
	if (this.hp <= 0) {
		if (Game.player.canSee(this)) {
			var deathMessage = function(name) { return function() { return MessageStrings.get(MSG_A_DIES, name); } }(this.name);
			Log.add(deathMessage);
		}
		var t = this.dungeon.tileAt(this.x, this.y);
		while (this.inventory.length > 0) {  // Drop entire inventory to the ground on death.
			t.items.push(this.inventory.pop());
		}
		if (t.creature !== this) {
			throw new Error("creatureDie: Dungeon and creature disagree on location upon death.");
		}
		t.creature = null;
		if (this === Game.player) {
			Game.player.hp = 0;
			Game.over = true;
			return;
		}
	}
}

function Creature(id) {
	this.id = id;
	this.actions = new Array();
	this.inventory = new Array();
	this.canSee = creatureCanSee;
	this.dieIfNeeded = creatureDie;
	var attr = CreatureAttrs[id];
	this.name = attr.name;
	this.hp = this.maxHp = new Dice(attr.initialMaxHP).roll();
	this.str = new Dice(attr.initialStrength).roll();
	this.def = new Dice(attr.initialDefence).roll();
	switch (id) {
	case "seeker":
		this.ai = seekAi;
		this.seenPlayer = false;
		break;
	default:
		break;
	}
}

function Action(id, a, b, c, d) {
	this.id = id;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
}
var FOV_UNKNOWN = 0;
var FOV_KNOWN = 1;
var FOV_SEEN = 2;

function fovUpdate(p) {
	var d = this.dungeon;
	function index(x, y) {
		return y * d.width + x;
	}
	function isSeen(x, y) {
		return x >= (p.x - r) && x <= (p.x + r) && y >= (p.y - r) && y <= (p.y + r);
	}
	var r = CreatureAttrs.player.sightRange;
	for (var x = 0, w = d.width; x < w; ++x) {
		for (var y = 0, h = d.height; y < h; ++y) {
			var i = index(x, y);
			var v = this.fovMap[i];
			var location = {};
			location.x = x; location.y = y;
			this.fovMap[i] = p.canSee(location) ? FOV_SEEN : (v !== FOV_UNKNOWN) ? FOV_KNOWN : FOV_UNKNOWN;
		}
	}
}

function FovMap(dungeon) {
	this.dungeon = dungeon;
	this.fovMap = new Array(dungeon.width * dungeon.height);
	for (var i = 0, len = this.fovMap.length; i < len; ++i) {
		this.fovMap[i] = FOV_UNKNOWN;
	}

	this.update = fovUpdate;
}
function simpleDungeonGenerator() {
	this.fill("wall");

	var midx = Math.floor(this.width / 2);
	var midy = Math.floor(this.height / 2);

	var x1 = getRandomInt(midx - 8, midx + 5);
	var x2 = getRandomInt(x1 + 3, x1 + 8);
	var y1 = getRandomInt(midy - 3, midy + 3);
	var y2 = getRandomInt(y1 + 3, y1 + 6);
	this.digRoom(x1, y1, x2, y2, "floor");

	var rx, ry;
	var d = this;
	function randomSpot() {
		rx = getRandomInt(1, d.width - 1);
		ry = getRandomInt(1, d.height - 1);
	}
	function randomSpotUntil(dg) {
		do {
			randomSpot();
		} while (!dg(rx, ry));
	}
	function wallAdjacentToFloor(x, y) {
		var tile = d.tileAt(x, y);
		if (tile.id != "wall") {
			return false;
		}
		var left = d.tileAt(x - 1, y);
		var right = d.tileAt(x + 1, y);
		var top = d.tileAt(x, y - 1);
		var bottom = d.tileAt(x, y + 1);
		return (left && left.id === "floor") || (right && right.id === "floor") || (top && top.id === "floor") || (bottom && bottom.id === "floor");
	}
	// Dig a simple corridor.
	function digCorridor() {
		randomSpotUntil(wallAdjacentToFloor);
		var directions = new Array(4);
		directions[0] = d.tileAt(rx - 1, ry);
		directions[1] = d.tileAt(rx + 1, ry);
		directions[2] = d.tileAt(rx, ry - 1);
		directions[3] = d.tileAt(rx, ry + 1);
		var length = getRandomInt(6, 12);
		DIRECTIONS: for (var i = 0, len = directions.length; i < len; i++) {
			var t = directions[i];
			var lengthToGo = length;
			while (lengthToGo > 0) {
				function outOfBounds(tile) {
					return t.x <= 0 || t.x >= d.width || t.y <= 0 || t.y >= d.height;
				}
				if (!t || t.id != "wall" || outOfBounds(t)) {
					break;
				}
				switch (i) {
				case 0: 
					var a = d.tileAt(t.x, t.y - 1);
					var b = d.tileAt(t.x, t.y + 1);
					if ((!a || a.id == "floor") || (!b || b.id == "floor")) {
						break DIRECTIONS;
					}
					t = d.tileAt(t.x - 1, t.y); 
					break;
				case 1:
					var a = d.tileAt(t.x, t.y - 1);
					var b = d.tileAt(t.x, t.y + 1);
					if ((!a || a.id == "floor") || (!b || b.id == "floor")) {
						break DIRECTIONS;
					}
					t = d.tileAt(t.x + 1, t.y);
					break;
				case 2:
					var a = d.tileAt(t.x - 1, t.y);
					var b = d.tileAt(t.x + 1, t.y);
					if ((!a || a.id == "floor") || (!b || b.id == "floor")) {
						break DIRECTIONS;
					}
					t = d.tileAt(t.x, t.y - 1);
					break;
				case 3:
					var a = d.tileAt(t.x - 1, t.y);
					var b = d.tileAt(t.x + 1, t.y);
					if ((!a || a.id == "floor") || (!b || b.id == "floor")) {
						break DIRECTIONS;
					}
					t = d.tileAt(t.x, t.y + 1);
					break;
				}
				lengthToGo--;
			}
			if (lengthToGo == 0) {
				// Room to dig, so do it.
				lengthToGo = length;
				while (lengthToGo > 0) {
					d.tiles[ry * d.width + rx].id = "floor";
					switch (i) {
					case 0:	rx--; break;
					case 1: rx++; break;
					case 2: ry--; break;
					case 3: ry++; break;
					}
					lengthToGo--;
				}
				return 1;
			}
		}
		return 0;
	}
	// Dig a simple room.
	function spaceForRoom(x1, y1, x2, y2) {
		if (x2 < x1) {
			var tmp = x1;
			x1 = x2;
			x2 = tmp;
		}
		if (y2 < y1) {
			var tmp = y1;
			y1 = y2;
			y2 = tmp;
		}
		for (var y = y1; y <= y2; y++) {
			for (var x = x1; x <= x2; x++) {
				if (x <= 0 || x >= d.width || y <= 0 || y >= d.height) {
					return false;
				}
				if (d.tiles[y * d.width + x].id == "floor") {
					return false;
				}
			}
		}
		return true;
	}
	function getRoomCoords(direction, rw, rh) {
		var rect = new Object();
		switch (direction) {
		case 0:
			rect.x1 = rx - (Math.floor(rw / 2) + 1);
			rect.x2 = rx - 1;
			rect.y1 = ry - Math.floor(rh / 2);
			rect.y2 = ry;
			break;
		case 1:
			rect.x1 = rx - 1;
			rect.x2 = rx - (Math.floor(rw / 2) + 1);
			rect.y1 = ry - Math.floor(rh / 2);
			rect.y2 = ry - 1;
			break;
		case 2:
			rect.x1 = rx - Math.floor(rw / 2);
			rect.x2 = rx - 1;
			rect.y1 = ry - (Math.floor(rh / 2) + 1);
			rect.y2 = ry - 1;
			break;
		case 3:
			rect.x1 = rx - Math.floor(rw / 2);
			rect.x2 = rx - 1;
			rect.y1 = ry - 1;
			rect.y2 = ry - (Math.floor(rh / 2) + 1);
			break;
		}
		return rect;
	}
	function digRoom() {
		randomSpotUntil(wallAdjacentToFloor);
		var roomWidth = getRandomInt(5, 8);
		var roomHeight = getRandomInt(4, 6);
		for (var i = 0; i < 4; i++) {
			var r = getRoomCoords(i, roomWidth, roomHeight);
			if (spaceForRoom(r.x1, r.y1, r.x2, r.y2)) {
				d.digRoom(r.x1, r.y1, r.x2, r.y2, "floor");
				d.tiles[ry * d.width + rx].id = "floor";  // The door-way.
				return 1;
			}
		}
		return 0;
	}
	// Select a random feature to build. Returns how many features were added.
	function digFeature() {
		var n = getRandomInt(1, 101)
		switch (true) {
		case n >= 1 && n < 83:   return digCorridor();
		default: return digRoom();
		}
		return 0;
	}

	var featuresToAdd = 60;
	while (featuresToAdd > 0) {
		featuresToAdd -= digFeature();
	}

	var t = this.getEmptyTile();
	t.id = "stairsup";
	
	var heartTile = this.getEmptyTile();
	addItem(this, heartTile, new Item("oaken_heart"));
}

function dungeonDraw() {
	var s = "<div class=\"dungeon\">";
	var lastname = "";
	for (var y = 0; y < this.height; y++) {
		// So we can roll the </span> into every opening without outputting garbage HTML.
		s += "<span class=\"rowstart\">";
		for (var x = 0; x < this.width; x++) {
			var i = y * this.width + x;
			var tile = this.tiles[i];
			var cname = "";
			if (Game.player.fov.fovMap[i] === FOV_KNOWN) {
				cname = "remembered";
			} else if (Game.player.fov.fovMap[i] === FOV_UNKNOWN) {
				if (lastname != "") {
					s += "</span><span>"
					lastname = "";
				}
				s += "&nbsp;";
				continue;
			}

			if (tile.creature !== null) {
				if (cname.length === 0) {
					cname = tile.creature.id;
				}
				if (lastname === "" || lastname != cname) {
					s += "</span><span class=\"" + cname + "\" onmouseover=\"onMouseOver('" + cname + "'); return false;\">";
				}
				s += CreatureAttrs[tile.creature.id].c;
			} else if (tile.items.length > 0) {
				if (cname.length === 0) {
					cname = tile.items[tile.items.length - 1].id;
				}
				if (lastname === "" || lastname != cname) {
					s += "</span><span class=\"" + cname + "\" onmouseover=\"onMouseOver('" + cname + "'); return false;\">";
				}
				s += ItemAttrs[tile.items[tile.items.length - 1].id].c;
			} else {
				if (cname.length === 0) {
					cname = tile.id;
				}
				if (lastname === "" || lastname != cname) {
					s += "</span><span class=\"" + cname + "\" onmouseover=\"onMouseOver('" + cname + "'); return false;\">";
				}
				s += TileAttrs[tile.id].c;
			}
			lastname = cname;
		}
		s += "</span><br>";
		lastname = "";
	}
	document.getElementById("dungeon").innerHTML = s;
}

function dungeonTileAt(x, y) {
	if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
		return undefined;
	}
	return this.tiles[y * this.width + x];
}

function dungeonDigRoom(x1, y1, x2, y2, id) {
	if (x2 < x1) {
		var tmp = x1;
		x1 = x2;
		x2 = tmp;
	}
	if (y2 < y1) {
		var tmp = y1;
		y1 = y2;
		y2 = tmp;
	}
	for (var y = y1; y <= y2; y++) {
		for (var x = x1; x <= x2; x++) {
			this.tiles[y * this.width + x] = new Tile(id, x, y);
		}
	}
}

function dungeonFill(id) {
	this.tiles = new Array(this.width * this.height);
	this.digRoom(0, 0, this.width - 1, this.height - 1, id);
}

function dungeonGetEmptyTile() {
	var d = this;
	function e(x, y) {
		var t = d.tileAt(x, y);
		return t.id === "floor" && t.creature == null;
	}
	do {
		var x = getRandomInt(1, this.width - 1);
		var y = getRandomInt(1, this.height - 1);
		var empty = e(x-1,y-1) && e(x,y-1) && e(x+1,y-1) && e(x-1,y) && e(x,y) && e(x+1,y) && e(x-1,y+1) && e(x,y+1) && e(x+1,y+1);
	} while (!empty);
	return d.tileAt(x, y);
}

function DungeonFloor(width, height, generator) {
	this.width = width;
	this.height = height;
	this.creatures = new Array();

	// Methods.
	this.generate = generator;
	this.draw = dungeonDraw;
	this.tileAt = dungeonTileAt;
	this.digRoom = dungeonDigRoom;
	this.fill = dungeonFill;
	this.getEmptyTile = dungeonGetEmptyTile;

	this.generate();
}
/*
 * The message log displays battle messages and the like.
 */

var Log = {
	display_height:10,  // How many messages to show in the log at once.
	messages:[],
	mostrecentlogs:[]
}

Log.draw = function() {
	var str = "<div class=\"log\">"
	for (var i = Log.messages.length - (Log.display_height + 1); i < Log.messages.length; i++) {
		var last = i === Log.messages.length - 1;
		if (last) {
			str += "<span class=\"mostrecentlog\">";
			this.mostrecentlogs[i] = true;
		} else if (this.mostrecentlogs[i] === true) {
			str += "<span class=\"exmostrecentlog\">";
		} else {
			str += "<span class=\"regularlog\">";
		}
		if (i < 0) {
			str += "<br>";
		} else {
			if (typeof Log.messages[i] === "function") {
				str += Log.messages[i]() + "<br>";
			} else {
				str += MessageStrings.get(Log.messages[i]) + "<br>";
			}
		}
		str += "</span>";
	}
	document.getElementById("log").innerHTML = str;
}

Log.add = function(msg) {
	Log.messages.push(msg);
	Log.mostrecentlogs.push(false);
}
var Game = {
	floor:0,
	info:MSG_INTRO,
	over:false
}

function populateDungeon() {
	addCreature(Game.dungeon, Game.dungeon.getEmptyTile(), Game.player);
	var thingsToAdd = 10;
	while (thingsToAdd-- > 0) {
		var t = Game.dungeon.getEmptyTile();
		addCreature(Game.dungeon, t, new Creature("seeker"));
	}
}

function onMouseOver(id) {
	switch (id) {
	case "wall":
	case "floor": Game.info = MSG_INTRO; break;
	case "player": Game.info = MSG_PLAYERDESC; break;
	case "seeker": Game.info = MSG_SEEKERDESC; break;
	default: break;
	}
}

Game.doAction = function(action) {
	switch (action.id) {
	/*
	 * "move"
	 * Move the creature on the current dungeons (a, b) tile to (c, d).
	 */
	case "move":
		var fromTile = this.dungeon.tileAt(action.a, action.b);
		var xMove = action.c - action.a;
		var yMove = action.d - action.b;
		moveCreature(this.dungeon, fromTile, xMove, yMove);
		break;
	case "doground":
		var tile = this.dungeon.tileAt(action.a, action.b);
		var creature = tile.creature;
		if (creature === null) {
			throw new Error("doAction: doground empty tile");
		}
		if (tile.items.length > 0) {
			while (tile.items.length > 0) {
				creature.inventory.push(tile.items.pop());
				if (Game.player.canSee(creature)) {
					Log.add(function() { return MessageStrings.get(MSG_A_PICKS_UP_B, creature.name, creature.inventory[creature.inventory.length - 1].name)});
				}
			}
		} else if (tile.id === "stairsup") {
			Game.floor++;
			Game.dungeon = new DungeonFloor(80, 25, simpleDungeonGenerator);
			populateDungeon();
			Log.add(MSG_CLIMB);
		} else {
			Log.add(MSG_FAIL_DOGROUND);
		}
		break;
	case "wait":
		break;
	default:
		throw new Error("Game.doAction(): unknown id: " + action.id);
	}
}

Game.update = function() {
	if (Game.player.actions.length == 0 || Game.over) {
		return;
	}
	for (var i = 0; i < Game.dungeon.creatures.length; i++) {
		var c = Game.dungeon.creatures[i];
		if (c.hp <= 0) {
			Game.dungeon.creatures.splice(i--, 1);
			continue;
		}
		if (typeof c.ai === "function") {
			c.ai();
		}
		if (c.actions.length > 0) {
			this.doAction(c.actions[0]);
			c.actions = c.actions.slice(1);
		}
	}
}

function drawInventory() {
	if (Game.player.inventory.length == 0) {
		return MessageStrings.get(MSG_EMPTY);
	}
	var s = new String();
	for (var i = 0, len = Game.player.inventory.length; i < len; ++i) {
		var item = Game.player.inventory[i];
		s += "<span class=\"inventoryitem\">" + String.fromCharCode("A".charCodeAt(0) + i) + "</span>: " + MessageStrings.get(item.name) + "<br>"
	}
	return s;
}

Game.draw = function() {
	MessageStrings.drawOptions();
	Log.draw();
	Game.dungeon.draw();
	document.getElementById("status").innerHTML = MessageStrings.getStatus(this.floor, this.player);
	document.getElementById("info").innerHTML = MessageStrings.get(Game.info);
	document.getElementById("inventory").innerHTML = drawInventory();
}

function moveCreature(floor, fromTile, xMove, yMove) {
	if (fromTile.creature === null) {
		throw new Error("moveCreature(): tried to move creature from empty tile.");
	}
	var newX = fromTile.x + xMove;
	var newY = fromTile.y + yMove;
	if (newX < 0 || newX >= floor.width || newY < 0 || newY >= floor.height) {
		Log.add(MSG_NO_WALK);
		return;
	}
	var toTile = floor.tileAt(newX, newY);
	if (toTile.creature != null) {
		attackCreature(fromTile.creature, toTile.creature);
		return;
	}
	if (!TileAttrs[toTile.id].walkable) {
		Log.add(MSG_NO_WALK);
		return;
	}
	if (toTile.items.length > 0 && fromTile.creature === Game.player) {
		for (var i = 0, len = toTile.items.length; i < len; ++i) {
			var name = ItemAttrs[toTile.items[i].id].name;
			Log.add(function() { return MessageStrings.get(MSG_A_IS_HERE, name); });
		}
	}
	toTile.creature = fromTile.creature;
	fromTile.creature = null;
	toTile.creature.x = toTile.x;
	toTile.creature.y = toTile.y;
	if (toTile.creature	 === Game.player) {
		toTile.creature.fov.update(Game.player);
	}
	return;
}

function attackCreature(attacker, defender) {
	Log.add(function() { return MessageStrings.get(MSG_A_ATTACKS_B, attacker.name, defender.name); } );
	var halfStr = Math.floor(attacker.str / 2);
	var halfDef = Math.floor(defender.def / 2);
	var atk = getRandomInt(attacker.str - halfStr, attacker.str + halfStr);
	var def = getRandomInt(defender.def - halfDef, defender.str + halfDef);
	var damage = atk - def;
	if (damage <= 0) {
		Log.add(function() { return MessageStrings.get(MSG_A_DODGES, defender.name); });
	} else {
		defender.hp -= damage;
		Log.add(function() { return MessageStrings.get(MSG_A_RECEIVES_B_DMG, defender.name, damage); });
		defender.dieIfNeeded();
	}
}

Game.input = function(event) {
	if (Game.player.actions.length > 0 || event.altKey || event.metaKey || event.ctrlKey) {
		return;
	}
	var px = Game.player.x, py = Game.player.y;
	switch (event.keyCode) {
	case 72: Game.player.actions.push(new Action("move", px, py, px - 1, py)); break;      // h
	case 74: Game.player.actions.push(new Action("move", px, py, px, py + 1)); break;      // j
	case 75: Game.player.actions.push(new Action("move", px, py, px, py - 1)); break;      // k
	case 76: Game.player.actions.push(new Action("move", px, py, px + 1, py)); break;      // l
	case 89: Game.player.actions.push(new Action("move", px, py, px - 1, py - 1)); break;  // y
	case 85: Game.player.actions.push(new Action("move", px, py, px + 1, py - 1)); break;  // u
	case 66: Game.player.actions.push(new Action("move", px, py, px - 1, py + 1)); break;  // b
	case 78: Game.player.actions.push(new Action("move", px, py, px + 1, py + 1)); break;  // n
	case 71: Game.player.actions.push(new Action("doground", px, py)); break;                      // g
	case 190:  // .
		if (event.shiftKey) {
			Game.player.actions.push(new Action("doground", px, py));
		} else {
			Game.player.actions.push(new Action("wait"));
		}
		break;
	case 188:  // ,
		if (event.shiftKey) {
			Game.player.actions.push(new Action("doground", px, py));
		}
		break;
	default:
		return;
	}
	event.preventDefault();
}

Game.run = function(event) {
	Game.input(event);
	Game.update();
	Game.draw();
}

window.onload = function() {
	Game.dungeon = new DungeonFloor(80, 25, simpleDungeonGenerator);
	Game.player = new Creature("player");
	populateDungeon();
	Game.player.fov.update(Game.player);
	if (getQueryParams(document.location.search).lang == "japanese") {
		MessageStrings.toggleLanguage();
	}
	Game.draw();
	document.addEventListener("keydown", Game.run);
	document.addEventListener("keyrepeat", Game.run);
}
