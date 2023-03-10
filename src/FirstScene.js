

export class FirstScene extends Phaser.Scene {
	constructor() {
		super('FirstScene')
	}


	preload() {
		//<a href="https://www.freepik.es/foto-gratis/luz-puerta-abierta_19139596.htm#from_view=detail_alsolike">Imagen de rawpixel.com</a> en Freepik
		this.load.image('background', 'assets/incio.png');
	}

	create() {
		this.background = this.add.image(400, 300, 'background');
		this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
	}
	
}
