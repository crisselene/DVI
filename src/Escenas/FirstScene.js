
import Player from "../Player.js";
import DialogPlugin from "../Plugins/DialogPlugin.js";


export default class FirstScene extends Phaser.Scene {
	constructor() {
		super('FirstScene')
		this.dialogos = new DialogPlugin(this)
		this.dialogoPeriodico = false
		this.dialogoLibro = false
		this.dialogoCama = false
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
		this.load.image("escalera", "assets/Tilesets/escalerascut.png")
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

		this.escaleras = this.physics.add.image(660, 280, "escalera")
		this.escaleras.scale = 1.5

		this.cama = this.physics.add.sprite(660, 280, "cama")
		this.cama.scale = 1.5
		this.cama.setCollideWorldBounds(true, 0.001)
		this.cama.setMaxVelocity(0, 0)

		
		
		this.player.depth = 2
		

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
		
		this.physics.add.overlap(this.player, this.escaleras, () => {

			let v1 = this.player.getCenter()
			let v2 = this.escaleras.getCenter()


			if (v1.distance(v2) < 18)
				this.scene.start("ColorScene")
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

		if (Number(this.player.x.toPrecision(3)) <= 199 && Number(this.player.x.toPrecision(3))>= 97
		 &&  Number(this.player.y.toPrecision(3))<= 355 && Number(this.player.y.toPrecision(3))>= 275 
		 && !this.dialogos.visible && !this.dialogoPeriodico){
			let texts = ["“ Diario Zaragoza: se quema la quinta planta del Hotel Corona de Aragón causando 83 muertos.” ", "¿Este hotel se quemó? que espeluznante… "]
			this.dialogos.addLongTexts(texts)
			this.dialogoPeriodico = true;
        }

		if (Number(this.player.x.toPrecision(3)) <= 469 && Number(this.player.x.toPrecision(3))>= 359
		 &&  Number(this.player.y.toPrecision(3))<= 115 && !this.dialogos.visible && !this.dialogoLibro){
			this.dialogos.addSimpleText("Un viejo libro...")
			this.dialogoLibro = true
        }

		if (Number(this.player.x.toPrecision(3)) <= 706 && Number(this.player.x.toPrecision(3))>= 608
		 &&  Number(this.player.y.toPrecision(3))<= 330 && Number(this.player.y.toPrecision(3))>= 228 
		 && !this.dialogos.visible && !this.dialogoCama){
			let texts = ["Hay marcas en el suelo como si alguien hubiera movido la cama.", "Creo que esta cama se podría empujar."]
			this.dialogos.addLongTexts(texts)
			this.dialogoCama = true;
        }

		if (Number(this.player.x.toPrecision(3)) <= 415 && Number(this.player.x.toPrecision(3))>= 343
		 &&  Number(this.player.y.toPrecision(3))>= 545 && !this.dialogos.visible){
			this.dialogos.addSimpleText("Vaya, está cerrada.")
        }	

		if(!this.player.isStopped()){
			console.log("X = " + Number(this.player.x.toPrecision(3)))
			console.log("Y = " + Number(this.player.y.toPrecision(3)))
		}

		if(!this.player.isStopped() && this.dialogos.dialog != "" && this.dialogos.visible){
			this.dialogos.moveWindow();
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

