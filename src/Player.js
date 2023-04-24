
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


        this.speed = 100

        let square = Math.pow(this.speed, 2)

        this.mod = Math.sqrt(2 * square)
        this.normalized = square / this.mod
       
        this.x = x;
        this.y = y;
        
        this.scene.add.particles("p")

        this.scene.anims.create({
			key: 'bajar',
			frames: scene.anims.generateFrameNumbers('player', {start:8, end:15}),
			frameRate: 10,
			repeat: 0
		});
        this.scene.anims.create({
			key: 'subir',
			frames: scene.anims.generateFrameNumbers('player', {start:16, end:23}),
			frameRate: 10,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'run',
			frames: scene.anims.generateFrameNumbers('player', {start:0, end:7}),
			frameRate: 10,
			repeat: 0
		});
        

        this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
		this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
		this.sKey = this.scene.input.keyboard.addKey('S'); //parar animación
		this.dKey = this.scene.input.keyboard.addKey('D'); //derecha
        this.shiftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
        this.space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        
        this.setScale(2,2);

        //this.scene.physics.add.sprite(this)
    }

  

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        
		if(this.dKey.isDown){

            if (this.sKey.isUp && this.wKey.isUp){
                this.setVelocityX(this.speed)
                this.setFlip(true, false)
			    this.play('run', true);
            }
            else this.setVelocityX(this.normalized)

               
		}     
        else if (this.aKey.isUp) this.setVelocityX(0)
        

		if(this.aKey.isDown){
            
            if (this.sKey.isUp && this.wKey.isUp){
                this.setVelocityX(-this.speed) 
                this.setFlip(false, false)
                this.play('run', true);
            }
            else this.setVelocityX(-this.normalized)
		}
        else if (this.dKey.isUp) this.setVelocityX(0)
     

        if(this.wKey.isDown){
            this.play('subir', true);
            
            if (this.dKey.isUp && this.aKey.isUp) this.setVelocityY(-this.speed) 
            else this.setVelocityY(-this.normalized)

        }else if (this.sKey.isUp) this.setVelocityY(0)
            
        
        if (this.sKey.isDown){
            this.play('bajar', true)
            if (this.dKey.isUp && this.aKey.isUp) this.setVelocityY(this.speed) 
            else this.setVelocityY(this.normalized)

            
            
        }else if (this.wKey.isUp) this.setVelocityY(0)

        this.sprint()
            
        if (this.isStopped()){
            this.anims.stop()
        }

       

        if ( Phaser.Input.Keyboard.JustDown(this.space)){
    
            this.x = this.getRndInteger(20, 500)
            this.y = this.getRndInteger(20, 500)
        }
   
    
    }

    isStopped() {
        return this.wKey.isUp && this.dKey.isUp && this.aKey.isUp && this.sKey.isUp;
    }

    sprint(){
        if (this.shiftKey.isDown){
            this.setVelocity(this.body.velocity.x * 2, this.body.velocity.y * 2)
            if (this.anims.currentAnim)
                this.anims.currentAnim.frameRate = 20
        }
        else if (this.anims.currentAnim) this.anims.currentAnim.frameRate = 10
    }

     getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }
}