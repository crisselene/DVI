import Player from "../Player.js";
import DialogPlugin from "../Plugins/DialogPlugin.js";


export default class Pasillo4Scene extends Phaser.Scene {
	constructor() {
		super('Pasillo4Scene')
		this.dialogos = new DialogPlugin(this)
	}
	preload() {
		//<a href="https://www.freepik.es/foto-gratis/luz-puerta-abierta_19139596.htm#from_view=detail_alsolike">Imagen de rawpixel.com</a> en Freepik
		//this.load.image('mainroom', 'assets/Tilemaps/mainRoom.png');
		//this.load.tilemapTiledJSON('mapa', '/assets/Tilemaps/mainRoom.json' );

		this.load.image("tiles", "assets/Tilesets/Tiles.png");
		this.load.image("props", "assets/Tilesets/Props.png");
		this.load.image("alfombras", "assets/Tilesets/alfombras.png");
		this.load.tilemapTiledJSON('map4','assets/Tilemaps/pasillo4.json');
		this.load.spritesheet("player", "assets/player/player.png", {frameWidth: 16, frameHeight:24});
		this.load.image("vision", "assets/backgrounds/vision.png")
	}

	create() {		

		

		//mapeado
		const map = this.make.tilemap({key: "map4", tileWidth: 32, tileHeight:32 });
		const tileset = map.addTilesetImage("paredes","tiles");
		const tileset2 = map.addTilesetImage("muebles","props");
		const tilesetAlfombras = map.addTilesetImage("alfombra","alfombras");
		
		const layer = map.createLayer("layer1", tileset, 0, 0);
		const alfombraLayer = map.createLayer("alfombra", tilesetAlfombras, 0, 0);
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
		this.player = new Player(this, 60, 315);
		this.player.setFlip(true, false);
		/*
		this.vision = this.make.image({
			x: this.player.x,
			y: this.player.y,
			key: "vision",
			add: false
		})

		this.vision.scale = 0.1 

		const width = this.scale.width
		const height = this.scale.height

		const rt = this.make.renderTexture({
			width, height
		}, true)

		rt.fill(0x000000, 1)
		rt.draw(layer)
		rt.setTint(0x3D3C3C)

		rt.draw(mueblesLayer)

		rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.vision)
		rt.mask.invertAlpha = true
		*/
		
		//collisions
		this.player.setCollideWorldBounds(true);

		mueblesLayer.setCollisionByProperty({collides:true}); 
		//this.physics.add.collider(this.player, mueblesLayer, ()=>{this.scene.get('DialogScene').showDialog('Chocaste contra un mueble')}, null, this);

		paredesLayer.setCollisionByProperty({collides:true}); 
		this.physics.add.collider(this.player, mueblesLayer, ()=>{console.log(this.scene.get('DialogScene'))}, null, this);

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
		/*if (this.vision){
			this.vision.x = this.player.x
			this.vision.y = this.player.y
		}*/

		if (Number(this.player.y.toPrecision(3)) <= 230){
			console.log("salir")
            this.scene.start('FirstScene');
        }		

		if(!this.player.isStopped() && this.dialogos.dialog != "" && this.dialogos.visible){
			this.dialogos.moveWindow();
		}

		if (Number(this.player.x.toPrecision(3)) >= 300){
			
			if(!this.dialogos.visible){
				this.dialogos.addSimpleText("Que mal royo!!")
				
			}		
        }
	}
	
}
