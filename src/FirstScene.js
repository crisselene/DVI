import Player from "./Player";


export default class FirstScene extends Phaser.Scene {
	constructor() {
		super('FirstScene')
	}
	preload() {
		//<a href="https://www.freepik.es/foto-gratis/luz-puerta-abierta_19139596.htm#from_view=detail_alsolike">Imagen de rawpixel.com</a> en Freepik
		//this.load.image('mainroom', 'assets/Tilemaps/mainRoom.png');
		//this.load.tilemapTiledJSON('mapa', '/assets/Tilemaps/mainRoom.json' );

		this.load.image("tiles", "/assets/Tilemaps/Tiles.png");
		this.load.tilemapTiledJSON('map','assets/Tilemaps/prueba1.json');

		this.load.spritesheet("player", "/assets/player/player.png", {frameWidth: 16, frameHeight:24});
	}

	create() {		
		//mapeado
		const map = this.make.tilemap({key: "map", tileWidth: 32, tileHeight:32 });
		const tileset = map.addTilesetImage("paredes","tiles");
		const layer = map.createLayer("layer1", tileset, 0, 0);
		const paredesLayer = map.createLayer("paredes", tileset, 0, 0);
		//resize mapeado
		layer.displayWidth = this.sys.canvas.width;
		layer.displayHeight = this.sys.canvas.height;
		paredesLayer.displayWidth = this.sys.canvas.width;
		paredesLayer.displayHeight = this.sys.canvas.height;
		
		//player
		this.player = new Player(this, 100, 100)
		
		//collisions
		this.physics.add.collider(this.player, paredesLayer);
		paredesLayer.setCollisionBetween(0,4);
		paredesLayer.setCollisionBetween(50,54);
	
	
	}

	update(){

	}
	
}
