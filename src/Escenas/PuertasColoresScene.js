import Player from "../Player.js";
import DialogPlugin from "../Plugins/DialogPlugin.js";

export default class PuertasColoresScene extends Phaser.Scene {

	constructor() {
		super('PuertasColoresScene')
		this.dialogos = new DialogPlugin(this);
	}
	preload() {		
		
		this.load.image("tiles", "assets/Tilesets/Tiles.png");
		this.load.image("props", "assets/Tilesets/Props.png");
		this.load.tilemapTiledJSON('PuertasColores','assets/Tilemaps/pasilloPuertas.json');
		this.load.spritesheet("player", "assets/player/player.png", {frameWidth: 16, frameHeight:24});
		this.load.image("vision", "assets/backgrounds/vision.png")
	}

	create(data) {			


		
		//mapeado
		const map = this.make.tilemap({key: "PuertasColores", tileWidth: 32, tileHeight:32 });
		const tileset = map.addTilesetImage("paredes","tiles");
		const tileset2 = map.addTilesetImage("muebles","props");
		
		const layer = map.createLayer("layer1", tileset, 0, 0);
		const paredesLayer = map.createLayer("paredes", tileset, 0, 0);
		const mueblesLayer = map.createLayer("muebles", tileset2, 0, 0);
		const coloresLayer = map.createLayer("colores", tileset, 0, 0);
		

		//resize mapeado
		layer.displayWidth = this.sys.canvas.width;
		layer.displayHeight = this.sys.canvas.height;
		paredesLayer.displayWidth = this.sys.canvas.width;
		paredesLayer.displayHeight = this.sys.canvas.height;
		mueblesLayer.displayWidth = this.sys.canvas.width;
		mueblesLayer.displayHeight = this.sys.canvas.height;
		coloresLayer.displayWidth = this.sys.canvas.width;
		coloresLayer.displayHeight = this.sys.canvas.height;
				
		//player
		this.player = new Player(this, 750, 315);	
		
		if (data.position){
			this.player.x = 345
			this.player.y = 255
			this.player.play("bajar", true)
		}

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
			if (!data.position)
				this.dialogos.addSimpleText("Que raro, todo tan oscuro y aquí de repente hay muchos colores...", true)					
			//this.dialogos.setText("Me han dado las llaves de la habitacion 510. Deberia buscarla...", true)
		}, {once: true})
		
		
	}

	update(){

		let posicionesX= [138,236,454,558,668]

		if (this.vision){
			this.vision.x = this.player.x
			this.vision.y = this.player.y
		}

		if ((Number(this.player.y.toPrecision(3)) <= 249 && Number(this.player.x.toPrecision(3))<= 300) ||
			( Number(this.player.y.toPrecision(3)) <= 249 && Number(this.player.x.toPrecision(3))>= 390)){
            let i = Math.floor(Math.random() * 5);
			this.player.x=posicionesX[i]
			this.player.y = 270
			this.player.play('bajar', true)
        }
		else if (Number(this.player.y.toPrecision(3)) <= 249 && Number(this.player.x.toPrecision(3))>= 300 &&  Number(this.player.x.toPrecision(3))<= 390){
			console.log("Puerta 1")
			this.dialogos = new DialogPlugin(this)
            this.scene.start('ColorScene')
			
        }


		if(!this.player.isStopped() && this.dialogos.dialog != "" && this.dialogos.visible){
			this.dialogos.moveWindow();
		}
		

	}
	
}
