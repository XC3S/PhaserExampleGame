var game = new Phaser.Game(640,360,Phaser.AUTO);

var player, cursors;

var GameState = {
	preload: function(){
		game.load.image('background','assets/image/Background.png');
		game.load.image('character','assets/image/Character.png');
		game.load.image('stone','assets/image/Stone.png');
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
	}
};

game.state.add('GameState',GameState);
game.state.start('GameState');