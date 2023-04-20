import Player from "../Player.js";

export default class ColorScene extends Phaser.Scene{
    constructor(){
        super("ColorScene")
    }

    preload(){
        this.load.image("tiles", "assets/Tilesets/Tiles.png");
		this.load.image("props", "assets/Tilesets/Props.png");
        this.load.image("altares", "assets/Tilesets/Furniture Pack/Sheets/shrines-altars-24x24-5x4-sheet.png")
        this.load.tilemapTiledJSON('map1','assets/Tilemaps/pruebaColores.json');
		this.load.spritesheet("player", "assets/player/player.png", {frameWidth: 16, frameHeight:24});
    }

    create(){

        const map = this.make.tilemap({key: "map1", tileWidth: 24, tileHeight:24 });
        const tileset = map.addTilesetImage("paredes","tiles");
            

        const layer = map.createLayer("layer1", tileset, 0, 0);
		const paredesLayer = map.createLayer("paredes", tileset, 0, 0);
        const coloresLayer = map.createLayer("colores", tileset, 0, 0);
       
        
        layer.displayWidth = this.sys.canvas.width;
		layer.displayHeight = this.sys.canvas.height;
		paredesLayer.displayWidth = this.sys.canvas.width;
		paredesLayer.displayHeight = this.sys.canvas.height;
		coloresLayer.displayWidth = this.sys.canvas.width;
		coloresLayer.displayHeight = this.sys.canvas.height;

        

	
		
		//player
		this.player = new Player(this, 370, 500);
        this.player.setCollideWorldBounds(true);

        paredesLayer.setCollisionByProperty({collides: true})

        
       

    }
}