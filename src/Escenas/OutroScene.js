
export default class OutroScene extends Phaser.Scene{

    constructor() {
		super('OutroScene')
        this.config = {
            skipKeys: ['ENTER', 'SPACE', 'S'],
        }
        this.keyObjects = []
	}

    preload(){
		this.load.video('outroVideo', 'assets/video/outroLogo.mp4', 'loadeddata', false, false);
    }

    create(){
        var vid = this.add.video(400, 300, 'outroVideo');
        this.config.skipKeys.forEach((key, i) => {
            this.keyObjects[i] = this.input.keyboard.addKey(key)
            this.keyObjects[i].once('down', () => {
                // Skip video
                vid.setPaused(true);
                this.scene.start('menuScene');
            })
        })
        vid.on('complete', this.changescene, this);
        vid.play(false);
    }

    changescene(){
        this.scene.start('menuScene');
    }



}