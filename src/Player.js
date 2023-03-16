
export default class Player extends Phaser.Physics.Arcade.Sprite{
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y){
        super(scene, x, y, "player")

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

       
       
        this.x = x;
        this.y = y;
        

        this.scene.anims.create({
			key: 'bajar',
			frames: scene.anims.generateFrameNumbers('player', {start:8, end:15}),
			frameRate: 8,
			repeat: 0
		});
        this.scene.anims.create({
			key: 'subir',
			frames: scene.anims.generateFrameNumbers('player', {start:16, end:23}),
			frameRate: 8,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'run',
			frames: scene.anims.generateFrameNumbers('player', {start:0, end:7}),
			frameRate: 8,
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
    
    
        this.mod = Math.sqrt(10000 + 10000)
    
        if (Number(this.x.toPrecision(3)) >= 610){
            this.visible = false
        }

		if(this.dKey.isDown){

            if (this.sKey.isUp && this.wKey.isUp){
                this.setVelocityX(100)
                this.setFlip(true, false)
			    this.play('run', true);
            }
            else this.setVelocityX(10000/this.mod)

               
		}     
        else if (this.aKey.isUp) this.setVelocityX(0)
        


		if(this.aKey.isDown){
            
            if (this.sKey.isUp && this.wKey.isUp){
                this.setVelocityX(-100) 
                this.setFlip(false, false)
                this.play('run', true);
            }
            else this.setVelocityX(-10000/this.mod)
		}
        else if (this.dKey.isUp) this.setVelocityX(0)
     

        if(this.wKey.isDown){
            this.play('subir', true);
            
            if (this.dKey.isUp && this.aKey.isUp) this.setVelocityY(-100) 
            else this.setVelocityY(-10000/this.mod)

        }else if (this.sKey.isUp) this.setVelocityY(0)
            
        
        if (this.sKey.isDown){
            this.play('bajar', true)
            if (this.dKey.isUp && this.aKey.isUp) this.setVelocityY(100) 
            else this.setVelocityY(10000/this.mod)

            
            
        }else if (this.wKey.isUp) this.setVelocityY(0)
            
        
    
    }
}