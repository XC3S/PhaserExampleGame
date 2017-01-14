var game = new Phaser.Game(640,360,Phaser.AUTO);

var GameState = {
	preload: function(){
		this.load.image('ground_grass','assets/image/grass.png');
	},
	create: function(){
		this.game.add.sprite(0,0,'ground_grass');
	},
	update: function(){

	}
};

game.state.add('GameState',GameState);
game.state.start('GameState');