import Fantasma from "../Fantasma.js";
import Player from "../Player.js";
import DialogPlugin from "../Plugins/DialogPlugin.js";
//import Pasillo2Scene from './Pasillo2Scene';

export default class Laberinto extends Phaser.Scene {

	constructor() {
		super('Laberinto')
		this.dialogos = new DialogPlugin(this);
	}
	preload() {
		//<a href="https://www.freepik.es/foto-gratis/luz-puerta-abierta_19139596.htm#from_view=detail_alsolike">Imagen de rawpixel.com</a> en Freepik
		//this.load.image('mainroom', 'assets/Tilemaps/mainRoom.png');
		//this.load.tilemapTiledJSON('mapa', '/assets/Tilemaps/mainRoom.json' );
		
		this.load.image("tilesLab", "assets/Tilesets/DungeonTileset.png");
		this.load.tilemapTiledJSON('mapLab','assets/Tilemaps/laberinto.json');
		this.load.spritesheet("player", "assets/player/player.png", {frameWidth: 16, frameHeight:24});
		this.load.spritesheet("fantasma", "assets/player/fantasma.png", {frameWidth: 16, frameHeight:24});
		this.load.image("vision", "assets/backgrounds/vision.png")
		this.load.image("altar0", "assets/Tilesets/altar0.png")

	}

	create() {		

	

		//mapeado
		const map = this.make.tilemap({key: "mapLab", tileWidth: 32, tileHeight:32 });
		const tileset = map.addTilesetImage("DungeonTileset","tilesLab");
		
		const layer = map.createLayer("layer1", tileset, 0, 0);
		const paredesLayer = map.createLayer("paredes", tileset, 0, 0);
		const mueblesLayer = map.createLayer("muebles", tileset, 0, 0);
		

		//resize mapeado
		layer.displayWidth = this.sys.canvas.width;
		layer.displayHeight = this.sys.canvas.height;
		paredesLayer.displayWidth = this.sys.canvas.width;
		paredesLayer.displayHeight = this.sys.canvas.height;
		mueblesLayer.displayWidth = this.sys.canvas.width;
		mueblesLayer.displayHeight = this.sys.canvas.height;
				
		//player
		this.player = new Player(this, 400, 615);
		this.player.play('subir', true)

		this.fantasma = new Fantasma(this, 400, 330);
		this.fantasma.play('subirFantasma', true)


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

		rt.fill(0x000000, 0.8)
	

		rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.vision)
		rt.mask.invertAlpha = true

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
		
		this.physics.add.collider(this.player, this.fantasma, ()=>{this.scene.start('PuertasColoresScene');}, null, this);

		//camara
		this.cameras.main.setBounds(0, 0, this.sys.canvas.width, this.sys.canvas.height);
		this.cameras.main.setZoom(2)
		//this.cameras.main.centerOn(this.player.x, this.player.y)
		this.cameras.main.startFollow(this.player, true)

		//Añade un dialogo al inicio de una escena
		//Es necesario porque si no la camara todavia no sigue al player y no muestra el dialogo en la posicion correcta
		this.cameras.main.once("followupdate", ()=>{				
			//this.dialogos.setText("Me han dado las llaves de la habitacion 510. Deberia buscarla...", true)
		}, {once: true})
		
	}

	enemyFollows () {
        this.physics.moveToObject(this.fantasma, this.player, 100);
    }

	update(){
		//this.cameras.main.centerOn(this.player.x, this.player.y)
		/*if (this.vision){
			this.vision.x = this.player.x
			this.vision.y = this.player.y
		}*/
		this.enemyFollows();
		
		if (this.vision){
			this.vision.x = this.player.x
			this.vision.y = this.player.y
		}

	

		
		if (Number(this.player.x.toPrecision(3)) <= 25 && Number(this.player.y.toPrecision(3)) >= 234 && Number(this.player.y.toPrecision(3)) <= 306 ){
			console.log("salir")
            this.scene.start('PuertasColoresScene');
        }


	}
	
}
