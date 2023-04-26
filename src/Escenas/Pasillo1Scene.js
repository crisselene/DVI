import Player from "../Player.js";
import DialogPlugin from "../Plugins/DialogPlugin.js";
//import Pasillo2Scene from './Pasillo2Scene';

export default class Pasillo1Scene extends Phaser.Scene {

	constructor() {
		super('Pasillo1Scene')
		this.dialogos = new DialogPlugin(this);
	}
	preload() {
		//<a href="https://www.freepik.es/foto-gratis/luz-puerta-abierta_19139596.htm#from_view=detail_alsolike">Imagen de rawpixel.com</a> en Freepik
		//this.load.image('mainroom', 'assets/Tilemaps/mainRoom.png');
		//this.load.tilemapTiledJSON('mapa', '/assets/Tilemaps/mainRoom.json' );
		
		this.load.image("tiles", "assets/Tilesets/Tiles.png");
		this.load.image("props", "assets/Tilesets/Props.png");
		this.load.image("alfombras", "assets/Tilesets/alfombras.png");
		this.load.tilemapTiledJSON('map1','assets/Tilemaps/pasillo1.json');
		this.load.spritesheet("player", "assets/player/player.png", {frameWidth: 16, frameHeight:24});
		this.load.image("vision", "assets/backgrounds/vision.png")
		

	}

	create() {		

	

		//mapeado
		const map = this.make.tilemap({key: "map1", tileWidth: 32, tileHeight:32 });
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
		this.player = new Player(this, 750, 315);

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

		//Añade un dialogo al inicio de una escena
		//Es necesario porque si no la camara todavia no sigue al player y no muestra el dialogo en la posicion correcta
		this.cameras.main.once("followupdate", ()=>{				
			this.dialogos.addSimpleText("Me han dado las llaves de la habitacion 510. Deberia buscarla...", true)
		}, {once: true})
		
		
	}

	update(){
		//this.cameras.main.centerOn(this.player.x, this.player.y)
		/*if (this.vision){
			this.vision.x = this.player.x
			this.vision.y = this.player.y
		}*/

		if (Number(this.player.x.toPrecision(3)) <= 60){
			console.log("salir")
            this.scene.start('Pasillo2Scene');
        }

		if(!this.player.isStopped() && this.dialogos.dialog != "" && this.dialogos.visible){
			this.dialogos.moveWindow();
		}
		

	}
	
}
