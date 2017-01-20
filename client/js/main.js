var game = new Phaser.Game(640,360,Phaser.AUTO);

var player, cursors, bullets;

var fireRate = 200;
var nextFire = 0;

var GameState = {
	preload: function(){
		game.load.image('background','assets/image/Background.png');
		game.load.image('character','assets/image/Character.png');
		game.load.image('stone','assets/image/Stone.png');
		game.load.image('bullet','assets/image/Bullet.png');
	},
	create: function(){
		game.add.tileSprite(0,0,2048,2048,'background');
		game.world.setBounds(0,0,1920,1920);
		game.physics.startSystem(Phaser.Physics.P2JS);

		player = game.add.sprite(200,200,'character');
		game.physics.p2.enable(player);
		player.body.fixedRotation = true;
		//player.body.debug = true;


		cursors = game.input.keyboard.createCursorKeys();
		game.camera.follow(player);

		var stone = game.add.sprite(100,500,'stone');
		game.physics.p2.enable(stone);
		stone.body.static = true;
		//stone.body.debug = true;

		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;

		bullets.createMultiple(50,'bullet');
		bullets.setAll('checkWouldBounds',true);
		bullets.setAll('outOfBoundsKill',true);


		//game.camera.deadzone = new Phaser.Rectangle(100,100,440,160);

	},
	update: function(){
		player.body.setZeroVelocity();

		if(cursors.up.isDown) {
			player.body.moveUp(150);
		}
		else if(cursors.down.isDown) {
			player.body.moveDown(150);
		}

		if(cursors.left.isDown) {
			player.body.moveLeft(150);
		}
		else if(cursors.right.isDown) {
			player.body.moveRight(150);
		}

		if(game.input.activePointer.isDown) {
			fire();
		}
	}
};

game.state.add('GameState',GameState);
game.state.start('GameState');

function fire() {
	if(game.time.now > nextFire && bullets.countDead() > 0) {
		nextFire = game.time.now + fireRate;

		var bullet = bullets.getFirstDead();

		bullet.reset(player.x - 32, player.y - 32);

		game.physics.p2.moveToPointer = function(displayObject,speed,pointer,maxTime) {
			if(speed === undefined) speed = 60;
			pointer = pointer || game.input.activePointer;
			if(maxTime === undefined) maxTime = 0;

			// @TODO
		};		

		game.physics.p2.angleToPointer = function(displayObject, pointer) {
			if(pointer === undefined) pointer = game.input.activePointer;
			if(world === undefined) world = false;

			if(world) {
				return Math.atan2(pointer.worldY - displayObject.world.y,pointer.worldX - displayObject.world.x);
			}
			else {
				return Math.atan2(pointer.worldY - displayObject.y, pointer.worldX - displayObject.x);
			}
		};

		game.physics.p2.distanceToPointer = function(displayObject, pointer){
			if (pointer === undefined) pointer = game.input.activePointer;
			if (world === undefined) world = false; 

			var dx = (world) ? displayObject.world.x - pointer.worldX : displayObject.x - pointer.worldX;
			var dy = (world) ? displayObject.world.y - pointer.worldY : displayObject.y - pointer.worldY;

			return Math.sqrt(dx * dx + dy * dy);
		};

		game.physics.p2.moveToPointer(bullet, 300);
	}
};