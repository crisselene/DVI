import Player from "./Player";


export default class FirstScene extends Phaser.Scene {
	constructor() {
		super('FirstScene')
	}
	preload() {
		//<a href="https://www.freepik.es/foto-gratis/luz-puerta-abierta_19139596.htm#from_view=detail_alsolike">Imagen de rawpixel.com</a> en Freepik
		this.load.image('mainroom', 'assets/Tilemaps/mainRoom.png');
		this.load.tilemapTiledJSON('mapa', 'assets/Tilemaps/mainRoom.json' );
		console.log(this.load)
		this.load.spritesheet("player", "/assets/player/player.png", {frameWidth: 16, frameHeight:24})
	}

	create() {
		const map = this.make.tilemap({ key: 'mapa' });
		const tiles = map.addTilesetImage('mainRoom','tiles');
		//Overhead ,  Interative  ,  Bakcground
		//this.background = this.add.image(400, 300, 'mainroom');
        //this.background.displayHeight = this.sys.canvas.height;
		//this.background.displayWidth = this.sys.canvas.width/2;
		const layer = map.createLayer('Overhead', tiles, 0 ,0);
		

		this.player = new Player(this, 100, 100)
	
	
	}
	
}
