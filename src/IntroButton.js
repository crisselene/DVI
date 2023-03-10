class IntroButton extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, 0, 0, config.key, config.up);

        //add this to the scene
        config.scene.add.existing(this);
        
    }
   
  


}