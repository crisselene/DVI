

// @ts-ignore
export default class menuScene extends Phaser.Scene {
	constructor() {
		super('menuScene')
	}


	preload() {
		//<a href="https://www.freepik.es/foto-gratis/luz-puerta-abierta_19139596.htm#from_view=detail_alsolike">Imagen de rawpixel.com</a> en Freepik
		this.load.image('background', 'assets/incio.png');
		//https://nectanebo.itch.io/menu-buttons?download
		this.load.image('button', 'assets/buttons/button_white_play.png');
		//https://therealswirls.itch.io/psx-horror-music
		this.load.audio('music', [
            'assets/audio/Clouds.m4a'
        ]);
		//Sound Effect by <a href="https://pixabay.com/users/universfield-28281460/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=140881">Universfield</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=140881">Pixabay</a>
		this.load.audio('clickSound', [
            'assets/audio/click.mp3'
        ]);
		//Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=20346">Pixabay</a>
		this.load.audio('door', [
            'assets/audio/doorCreekAmbient.mp3'
        ]);
	}

	create() {
		this.background = this.add.image(400, 300, 'background');
		this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
		this.boton = this.add.sprite(400,450, 'button').setInteractive();
		this.boton.displayHeight= 70;
		this.boton.displayWidth= 200;
		

		this.music = this.sound.add("music",{volume: 0.5, loop: true });
		this.door = this.sound.add("door", { loop: true });
		

        this.music.play();
		this.door.play();

		this.clickSound = this.sound.add("clickSound", { loop: false });
		this.input.on('pointerover', (event, gameObjects)=> {
			this.clickSound.play();
			gameObjects[0].setTint(0xff0000);
		});

		this.input.on('pointerout', (event, gameObjects)=> {
			gameObjects[0].clearTint();
		});

		this.boton.on('pointerup',  function (pointer){
			this.music.stop();
			this.door.stop();
            this.scene.start('FirstScene');

        }, this);
	}
	
}
