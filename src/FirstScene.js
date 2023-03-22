import Player from "./Player.js";


export default class FirstScene extends Phaser.Scene {
	constructor() {
		super('FirstScene')
	}
	preload() {
		//<a href="https://www.freepik.es/foto-gratis/luz-puerta-abierta_19139596.htm#from_view=detail_alsolike">Imagen de rawpixel.com</a> en Freepik
		//this.load.image('mainroom', 'assets/Tilemaps/mainRoom.png');
		//this.load.tilemapTiledJSON('mapa', '/assets/Tilemaps/mainRoom.json' );

		this.load.image("tiles", "/assets/Tilesets/Tiles.png");
		this.load.image("props", "/assets/Tilesets/Props.png");
		this.load.tilemapTiledJSON('map','assets/Tilemaps/prueba1.json');

		this.load.spritesheet("player", "/assets/player/player.png", {frameWidth: 16, frameHeight:24});
	}

	create() {		

		

		//mapeado
		const map = this.make.tilemap({key: "map", tileWidth: 32, tileHeight:32 });
		const tileset = map.addTilesetImage("paredes","tiles");
		const tileset2 = map.addTilesetImage("muebles","props");
		
		const layer = map.createLayer("layer1", tileset, 0, 0);
		const paredesLayer = map.createLayer("paredes", tileset, 0, 0);
		const mueblesLayer = map.createLayer("muebles", tileset2, 0, 0);

		//resize mapeado
		layer.displayWidth = this.sys.canvas.width;
		layer.displayHeight = this.sys.canvas.height;
		paredesLayer.displayWidth = this.sys.canvas.width;
		paredesLayer.displayHeight = this.sys.canvas.height;
		mueblesLayer.displayWidth = this.sys.canvas.width;
		mueblesLayer.displayHeight = this.sys.canvas.height;
		
		//player
		this.player = new Player(this, 370, 500);
		
		//collisions
		mueblesLayer.setCollisionByProperty({collides:true}); 
		this.physics.add.collider(this.player, mueblesLayer, ()=>console.log('collide'), null, this);
		paredesLayer.setCollisionBetween(0,4);
		paredesLayer.setCollisionBetween(50,54);

		this.physics.add.collider(this.player, paredesLayer);
		//this.physics.add.collider(this.player, mueblesLayer);
		
		
	

		//camara
		this.cameras.main.setBounds(0, 0, this.sys.canvas.width, this.sys.canvas.height);
		this.cameras.main.setZoom(2)
		//this.cameras.main.centerOn(this.player.x, this.player.y)
		this.cameras.main.startFollow(this.player, true)
	
	}

	update(){
		//this.cameras.main.centerOn(this.player.x, this.player.y)
	}
	
}
