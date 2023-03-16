import Player from "./Player";


export default class FirstScene extends Phaser.Scene {
	constructor() {
		super('FirstScene')
	}


	preload() {
		//<a href="https://www.freepik.es/foto-gratis/luz-puerta-abierta_19139596.htm#from_view=detail_alsolike">Imagen de rawpixel.com</a> en Freepik
		this.load.image('background', 'assets/incio.png');
		this.load.spritesheet("player", "/assets/player/player.png", {frameWidth: 16, frameHeight:24})
	}

	create() {
		this.background = this.add.image(400, 300, 'background');
		this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

		let player = new Player(this, 100, 100)
	
	
	}
	
}
