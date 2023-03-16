
export default class Player extends Phaser.GameObjects.Sprite{
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y){
        super(scene, x, y, "player")

        this.scene.physics.add.existing(this); // add this line
        this.scene.add.existing(this)

        this.x = x;
        this.y = y;
        

        this.scene.anims.create({
			key: 'bajar',
			frames: scene.anims.generateFrameNumbers('player', {start:8, end:15}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
			key: 'subir',
			frames: scene.anims.generateFrameNumbers('player', {start:16, end:23}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'run',
			frames: scene.anims.generateFrameNumbers('player', {start:0, end:7}),
			frameRate: 18,
			repeat: 0
		});

        this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
		this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
		this.sKey = this.scene.input.keyboard.addKey('S'); //parar animación
		this.dKey = this.scene.input.keyboard.addKey('D'); //derecha

        this.play('bajar');
        this.setScale(2,2);

        //this.scene.physics.add.sprite(this)
    }

  

    preUpdate(t, dt){
        super.preUpdate(t, dt);

		// Mientras pulsemos la tecla 'A'
		if(this.dKey.isDown){
            this.setVelocity(0, 1)
		}

      


		// Mientras pulsemos la tecla 'D'
		if(this.aKey.isDown){
				this.setFlip(false, false)
				this.play('run', true);
                this.x -= dt/10
		}

        if(this.wKey.isDown){
            this.play('subir', true);
            this.y -= dt/10
        }
            
        
        if (this.sKey.isDown){
            this.play('bajar', true)
            this.y += dt/10
        }
            
        
    
    }
}