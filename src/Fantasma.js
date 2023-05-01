
export default class Fantasma extends Phaser.Physics.Arcade.Sprite{
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y){
        super(scene, x, y, "fantasma")

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);


        this.speed =  Phaser.Math.Between(20, 100);

        let square = Math.pow(this.speed, 2)

        this.mod = Math.sqrt(2 * square)
        this.normalized = square / this.mod
       
        this.x = x;
        this.y = y;
        
        this.scene.add.particles("p")


        this.scene.anims.create({
			key: 'subirFantasma',
			frames: scene.anims.generateFrameNumbers('fantasma', {start:0, end:3}),
			frameRate: 10,
			repeat: 0
		});
        
        this.setScale(2,2);
 

        //thi.scene.physics.add.sprite(this)
    }

  

    preUpdate(t, dt){
        super.preUpdate(t, dt);

      /*  
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
    */
    }

     getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }
   

}