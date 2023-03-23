
import Phaser from "phaser";
// @ts-ignore
export default class menuScene extends Phaser.Scene {
	constructor() {
		super('menuScene')
	}


	preload() {
		//<a href="https://www.freepik.es/foto-gratis/luz-puerta-abierta_19139596.htm#from_view=detail_alsolike">Imagen de rawpixel.com</a> en Freepik
		this.load.image('background', 'assets/backgrounds/mainMenu/incio.png');

		//https://nectanebo.itch.io/menu-buttons?download
		this.load.image('play_button', 'assets/buttons/mainMenu/play_button.png');
		this.load.image('sound_button', 'assets/buttons/mainMenu/sound_button.png');

		// Variación propia Eros PS
		this.load.image('sound_muted_button', 'assets/buttons/mainMenu/sound_muted_button.png');
		//https://therealswirls.itch.io/psx-horror-music
		this.load.audio('music', [
            'assets/audio/mainMenu/Clouds.m4a'
        ]);
		//Sound Effect by <a href="https://pixabay.com/users/universfield-28281460/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=140881">Universfield</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=140881">Pixabay</a>
		this.load.audio('clickSound', [
            'assets/audio/cursor/click.mp3'
        ]);
		//Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=20346">Pixabay</a>
		this.load.audio('door', [
            'assets/audio/mainMenu/doorCreekAmbient.mp3'
        ]);
	}

	create() {
		// Background
		this.background = this.add.image(400, 300, 'background');
		this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
		
		// Play button
		this.play_boton = this.add.image(400,450, 'play_button').setInteractive();
		this.play_boton.displayHeight= 70;
		this.play_boton.displayWidth= 200;
		// Settings button
		this.sound_button = this.add.image(760, 40, 'sound_button').setInteractive();
		this.sound_button.displayHeight= 70;
		this.sound_button.displayWidth= 70;
			// Muted button
		this.sound_muted_button = this.add.image(760, 40, 'sound_muted_button').setInteractive();
		this.sound_muted_button.displayHeight= 70;
		this.sound_muted_button.displayWidth= 70;
		this.sound_muted_button.visible = false;
		// Sounds & Music
		this.music = this.sound.add("music",{volume: 0.5, loop: true });
		this.door = this.sound.add("door", { loop: true });
        this.music.play();
		this.door.play();
		this.clickSound = this.sound.add("clickSound", { loop: false });

		// Listeners
		this.input.on('pointerover', (event, gameObjects)=> {
			this.clickSound.play();
			gameObjects[0].setTint(0xff0000);
		});

		this.input.on('pointerout', (event, gameObjects)=> {
			gameObjects[0].clearTint();
		});

		this.play_boton.on('pointerup', (pointer) =>{
			this.music.stop();
			this.door.stop();
            this.scene.start('IntroScene');

        }, this);

		// Sound button

		let toggleMuteState = (pointer) =>{
			this.game.sound.mute = !this.game.sound.mute;
			this.sound_muted_button.visible = !this.sound_muted_button.visible;
			this.sound_button.visible = !this.sound_button.visible;
        }

		this.sound_button.on('pointerup', toggleMuteState, this);	
		this.sound_muted_button.on('pointerup', toggleMuteState, this);
	}
	
}
