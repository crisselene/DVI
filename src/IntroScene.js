

export default class SceneIntro extends Phaser.Scene {
	constructor() {
		super('SceneIntro')
	}


	preload() {
		
		this.load.image('background', 'assets/incio.png');
		this.load.image('button', 'assets/buttons/button_white_play.png');
		this.load.audio('music', [
            'assets/music/Clouds.m4a'
        ]);
	}

	create() {
		this.background = this.add.image(400, 300, 'background');
		this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
		this.boton = this.add.sprite(400,450, 'button').setInteractive();
		this.boton.displayHeight= 70;
		this.boton.displayWidth= 200;

		this.music = this.sound.add("music", { loop: true });

        this.music.play();


		this.input.on('pointerover', function (event, gameObjects) {
			gameObjects[0].setTint(0xff0000);
		});

		this.input.on('pointerout', function (event, gameObjects) {
			gameObjects[0].clearTint();
		});

		
	}
	
}
