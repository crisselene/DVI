import Player from "../Player.js";
import DialogPlugin from "../Plugins/DialogPlugin.js";

export default class ColorScene extends Phaser.Scene{
    constructor(){
        super("ColorScene")
        this.dialogos = new DialogPlugin(this)
    }

    preload(){
        this.load.image("tiles", "assets/Tilesets/Tiles.png");
		this.load.image("props", "assets/Tilesets/Props.png");
        this.load.tilemapTiledJSON('pruebaColores','assets/Tilemaps/pruebaColores.json');
		this.load.spritesheet("player", "assets/player/player.png", {frameWidth: 16, frameHeight:24});
        this.load.image("square", "assets/Tilesets/TextureSquare.png")

        this.load.image("altarvacio", "assets/Tilesets/altarvacio.png")
        this.load.image("altar0", "assets/Tilesets/altar0.png")
        this.load.image("altar1", "assets/Tilesets/altar1.png")
        this.load.image("altar2", "assets/Tilesets/altar2.png")
        this.load.image("altar3", "assets/Tilesets/altar3.png")
        this.load.image("altar4", "assets/Tilesets/altar4.png")
        this.load.image("altar5", "assets/Tilesets/altar5.png")
        this.load.image("vision", "assets/backgrounds/vision.png")

    }

    create(){

        this.map = this.make.tilemap({key: "pruebaColores", tileWidth: 24, tileHeight:24 });
        this.tileset = this.map.addTilesetImage("paredes","tiles");
            

        const layer = this.map.createLayer("layer1", this.tileset, 0, 0);
		const paredesLayer = this.map.createLayer("paredes", this.tileset, 0, 0);
        const coloresLayer = this.map.createLayer("colores", this.tileset, 0, 0);
        this.puertaC = this.map.createLayer("puertaCerrada", this.tileset, 0, 0)
        
        
       
        
        layer.displayWidth = this.sys.canvas.width;
		layer.displayHeight = this.sys.canvas.height;
		paredesLayer.displayWidth = this.sys.canvas.width;
		paredesLayer.displayHeight = this.sys.canvas.height;
		coloresLayer.displayWidth = this.sys.canvas.width;
		coloresLayer.displayHeight = this.sys.canvas.height;
        
        this.puertaC.displayWidth = this.sys.canvas.width;
		this.puertaC.displayHeight = this.sys.canvas.height;

    
		
		//player
		this.player = new Player(this, 132, 92);
        this.player.play("bajar", true)
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(6)

        paredesLayer.setCollisionByProperty({collides: true})
        this.puertaC.setCollisionByProperty({collides: true})

        this.physics.add.collider(this.player, [paredesLayer])
        this.colisionPuerta = this.physics.add.collider(this.player, this.puertaC)

        this.contador = 0
        this.pulsado = -1

        this.altares = []
        for (let i = 0; i < 6; i++){
            let img = this.physics.add.image(280 + 48 * i, 100, "altarvacio")
            img.scale = 2
            img.setImmovable()
            this.altares.push(img)
            this.physics.add.collider(this.player, this.altares[i])
        }

        const pos = [
            {x: 200, y: 195}, 
            {x: 414, y: 195}, 
            {x: 626, y: 195},
            {x: 200, y: 375}, 
            {x: 414, y: 375}, 
            {x: 626, y: 375}
        ]


        pos.forEach((e, i)=> {
            let img = this.physics.add.image(e.x, e.y, "square")
            img.setScale(0.02)
            img.setAlpha(0)
            img.setData("color", i)
            
            this.physics.add.overlap(this.player, img, () => {
                
                if (this.contador < 6){

                    let pulsado = img.getData("color") 
              
                    if (this.pulsado != pulsado){
                        this.altares[this.contador].setTexture("altar" + pulsado)
                        this.altares[this.contador].setData("color", pulsado)
                        this.pulsado = pulsado
                        this.contador++;

                        if (this.contador == 6){
                            this.checkCombinacion()
                        }
                    }

                }
        
      

            })
        })

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

		rt.fill(0x000000, 0.7)
	

		rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.vision)
		rt.mask.invertAlpha = true


    }

    checkCombinacion(){

        let comb = ""
        this.altares.forEach(e =>{
            comb += e.getData("color")
        })
        
        
        if ("052143" === comb){
            console.log("Correcto")
            
            this.puertaLayer = this.map.createLayer("puertaAbierta", this.tileset, 0, 0)
            this.colisionPuerta.destroy()
            this.puertaLayer.displayWidth = this.sys.canvas.width;
		    this.puertaLayer.displayHeight = this.sys.canvas.height;
        }
        else{
           
            if (!this.dialogos.visible)
                this.dialogos.addSimpleText("Vaya, combinación incorrecta... Debería buscar pistas coloridas.", true)

            setTimeout(() => {
                this.contador = 0
                this.pulsado = -1
                this.altares.forEach( e => {
                    e.setTexture("altarvacio")
                    e.setData("color", -1)
                })
            }, 1000)
            
        }

 
    }

    update(){
        if (this.vision){
			this.vision.x = this.player.x
			this.vision.y = this.player.y
		}


        if (this.player.x < 143 && this.player.y < 50){
            this.scene.start("PuertasColoresScene", {position: true})
        }


        if (this.player.x > 650 && this.player.y < 50){
            this.scene.start('OutroScene');
        }

        if(!this.player.isStopped() && this.dialogos.dialog != "" && this.dialogos.visible){
			this.dialogos.moveWindow();
		}
    }

}