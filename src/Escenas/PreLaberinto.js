
import Player from "../Player.js";
import DialogPlugin from "../Plugins/DialogPlugin.js";


export default class PreLaberinto extends Phaser.Scene {
	
	constructor() {
		super('PreLaberinto')
		this.dialogos = new DialogPlugin(this)
		this.dialogoPeriodico = false
		this.dialogoLibro = false
		this.dialogoCama = false
		
		
	}

	init(data){
		console.log('init', data);
    	this.muerto = data.muerto;
	
	}

	preload() {
		//<a href="https://www.freepik.es/foto-gratis/luz-puerta-abierta_19139596.htm#from_view=detail_alsolike">Imagen de rawpixel.com</a> en Freepik
		//this.load.image('mainroom', 'assets/Tilemaps/mainRoom.png');
		//this.load.tilemapTiledJSON('mapa', '/assets/Tilemaps/mainRoom.json' );

		this.load.image("tiles", "assets/Tilesets/Tiles.png");
		this.load.image("props", "assets/Tilesets/Props.png");
		this.load.image("alfombras", "assets/Tilesets/alfombras.png");
		this.load.tilemapTiledJSON('mapPreLab','assets/Tilemaps/prelaberinto.json');
		this.load.spritesheet("player", "assets/player/player.png", {frameWidth: 16, frameHeight:24});
		this.load.image("vision", "assets/backgrounds/vision.png")
		this.load.image("furniture", "assets/Tilesets/Furniture Pack/Sheets/furniture-24x24-5x4-sheet.png")
		this.load.image("altares", "assets/Tilesets/Furniture Pack/Sheets/shrines-altars-24x24-5x4-sheet.png")
		this.load.image("ventana", "assets/Tilesets/ventana.png")
		this.load.image("halloween", "assets/Tilesets/11_Halloween_16x16.png")
		
	}

	create() {		

		//mapeado
		const mapPreLab = this.make.tilemap({key: "mapPreLab", tileWidth: 32, tileHeight:32 });
		
		const tileset = mapPreLab.addTilesetImage("paredes","tiles");
		const tileset2 = mapPreLab.addTilesetImage("muebles","props");
		const tilesetFurniture = mapPreLab.addTilesetImage("furniture-24x24-5x4-sheet", "furniture");
		const tilesetAltares = mapPreLab.addTilesetImage("shrines-altars-24x24-5x4-sheet", "altares");
		const tilesetVentana = mapPreLab.addTilesetImage("ventana", "ventana");
		const tilesetAlfombras = mapPreLab.addTilesetImage("alfombras","alfombras");
		const tilesetHalloween = mapPreLab.addTilesetImage("halloween","halloween");
		
		const layer = mapPreLab.createLayer("layer1", tileset, 0, 0);
		const alfombraLayer = mapPreLab.createLayer("alfombras", tilesetAlfombras, 0, 0);
		const paredesLayer = mapPreLab.createLayer("paredes", tileset, 0, 0);
		const mueblesLayer = mapPreLab.createLayer("muebles", [tileset2,tilesetFurniture], 0, 0);
		const objetosLayer = mapPreLab.createLayer("objetos", [tileset2,tilesetFurniture,tilesetAltares,tilesetVentana, tilesetHalloween], 0, 0);
		
		
		//resize mapeado
		layer.displayWidth = this.sys.canvas.width;
		layer.displayHeight = this.sys.canvas.height;
		paredesLayer.displayWidth = this.sys.canvas.width;
		paredesLayer.displayHeight = this.sys.canvas.height;
		mueblesLayer.displayWidth = this.sys.canvas.width;
		mueblesLayer.displayHeight = this.sys.canvas.height;
		alfombraLayer.displayWidth = this.sys.canvas.width;
		alfombraLayer.displayHeight = this.sys.canvas.height;
		objetosLayer.displayWidth = this.sys.canvas.width;
		objetosLayer.displayHeight = this.sys.canvas.height;
	
		
		//player
		if(this.muerto){
			let texts = ["Debería intentarlo de nuevo."]
			this.dialogos.addLongTexts(texts)
			this.player = new Player(this, 359, 353);
			this.player.play('bajar', true)
			
		}else{
			this.player = new Player(this, 25, 320);
			this.player.setFlip(true, false);
		}
		

		this.vision = this.make.image({
			x: this.player.x,
			y: this.player.y,
			key: "vision",
			add: false
		})

		
		this.vision.scale = 0.1 
	
		
		this.player.depth = 2
		

		//collisions
		this.player.setCollideWorldBounds(true);
		

		mueblesLayer.setCollisionByProperty({collides:true}); 
		paredesLayer.setCollisionByProperty({collides:true});
		objetosLayer.setCollisionByProperty({collides:true});
		
	
		this.physics.add.collider(this.player, [mueblesLayer, paredesLayer, objetosLayer]);

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

		/*if (Number(this.player.x.toPrecision(3)) <= 199 && Number(this.player.x.toPrecision(3))>= 97
		 &&  Number(this.player.y.toPrecision(3))<= 355 && Number(this.player.y.toPrecision(3))>= 275 
		 && !this.dialogos.visible && !this.dialogoPeriodico){
			let texts = ["“ Diario Zaragoza: se quema la quinta planta del Hotel Corona de Aragón causando 83 muertos.” ", "¿Este hotel se quemó? que espeluznante… "]
			this.dialogos.addLongTexts(texts)
			this.dialogoPeriodico = true;
        }*/


		// MOSTRAR SITAUCIÓN DEL PLAYERs
		if(!this.player.isStopped()){
			//console.log("X = " + Number(this.player.x.toPrecision(3)))
			//console.log("Y = " + Number(this.player.y.toPrecision(3)))
		}

		if(!this.player.isStopped() && this.dialogos.dialog != "" && this.dialogos.visible){
			this.dialogos.moveWindow();
		}

		if (this.player.y < 100){
            this.scene.start("Laberinto", {position: true})
        }
		
	}
	
}

