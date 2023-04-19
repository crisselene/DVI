
import Player from "../Player.js";


export default class FirstScene extends Phaser.Scene {
	constructor() {
		super('FirstScene')
	}
	preload() {
		//<a href="https://www.freepik.es/foto-gratis/luz-puerta-abierta_19139596.htm#from_view=detail_alsolike">Imagen de rawpixel.com</a> en Freepik
		//this.load.image('mainroom', 'assets/Tilemaps/mainRoom.png');
		//this.load.tilemapTiledJSON('mapa', '/assets/Tilemaps/mainRoom.json' );

		this.load.image("tiles", "assets/Tilesets/Tiles.png");
		this.load.image("props", "assets/Tilesets/Props.png");
		this.load.image("alfombras", "assets/Tilesets/alfombras.png");
		this.load.tilemapTiledJSON('map','assets/Tilemaps/prueba1.json');
		this.load.spritesheet("player", "assets/player/player.png", {frameWidth: 16, frameHeight:24});
		this.load.image("vision", "assets/backgrounds/vision.png")
		this.load.image("cama", "assets/Tilesets/cama.png")
	}

	create() {		

		

		//mapeado
		const map = this.make.tilemap({key: "map", tileWidth: 32, tileHeight:32 });
		const tileset = map.addTilesetImage("paredes","tiles");
		const tileset2 = map.addTilesetImage("muebles","props");
		const tilesetAlfombras = map.addTilesetImage("alfombras","alfombras");
		
		const layer = map.createLayer("layer1", tileset, 0, 0);
		const alfombraLayer = map.createLayer("alfombras", tilesetAlfombras, 0, 0);
		const paredesLayer = map.createLayer("paredes", tileset, 0, 0);
		const mueblesLayer = map.createLayer("muebles", tileset2, 0, 0);
		
		

		//resize mapeado
		layer.displayWidth = this.sys.canvas.width;
		layer.displayHeight = this.sys.canvas.height;
		paredesLayer.displayWidth = this.sys.canvas.width;
		paredesLayer.displayHeight = this.sys.canvas.height;
		mueblesLayer.displayWidth = this.sys.canvas.width;
		mueblesLayer.displayHeight = this.sys.canvas.height;
		alfombraLayer.displayWidth = this.sys.canvas.width;
		alfombraLayer.displayHeight = this.sys.canvas.height;
	
		
		//player
		this.player = new Player(this, 370, 500);

		this.vision = this.make.image({
			x: this.player.x,
			y: this.player.y,
			key: "vision",
			add: false
		})

		
		this.vision.scale = 0.1 

		this.cama = this.physics.add.sprite(660, 280, "cama")

		this.cama.scale = 1
		this.cama.setCollideWorldBounds(true, 0.001)
		this.cama.setMaxVelocity(0, 0)
		

		//collisions
		this.player.setCollideWorldBounds(true);
		

		mueblesLayer.setCollisionByProperty({collides:true}); 
		paredesLayer.setCollisionByProperty({collides:true});
		
	
		this.physics.add.collider(this.player, [mueblesLayer, paredesLayer]);
		this.physics.add.collider(this.player, this.cama, () => {
			
	
			let position = this._positionRelative()
		

			if (this.cama.x <= 580)
				this.cama.setImmovable( (position == 1 || ((position == 3 && this.cama.y <= 200))))
				
			else if (this.cama.y <= 200)
				this.cama.setImmovable((position == 3))
				
				
			
			
		})
		
	
		

		//camara
		this.cameras.main.setBounds(0, 0, this.sys.canvas.width, this.sys.canvas.height);
		this.cameras.main.setZoom(2)
		this.cameras.main.startFollow(this.player, true)

		const width = this.scale.width
		const height = this.scale.height

		const rt = this.make.renderTexture({
			width, height
		}, true)

		rt.fill(0x000000, 0.8)
	

		rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.vision)
		rt.mask.invertAlpha = true
	
		
	}

	update(){
		//this.cameras.main.centerOn(this.player.x, this.player.y)
		if (this.vision){
			this.vision.x = this.player.x
			this.vision.y = this.player.y
		}

		
			
		
	}

	_positionRelative(){
		
		let a = this.cama.getTopLeft()
		let b = this.cama.getTopRight()


		if (this.player.getBottomRight().x <= a.x) return 0 //izq
		else if (this.player.getBottomLeft().x >= b.x) return 1	//der 
		else if (this.player.getBottomLeft().y <= a.y) return 2  //arr
		else return 3  //aba
		
	}
	
}

