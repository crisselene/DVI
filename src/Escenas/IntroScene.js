
export default class IntroScene extends Phaser.Scene{

    constructor() {
		super('IntroScene')
        this.config = {
            skipKeys: ['ENTER', 'SPACE', 'S'],
        }
        this.keyObjects = []
	}

    preload(){
		this.load.video('introVideo', 'assets/video/introLogo.mp4', 'loadeddata', false, false);
    }

    create(){
        var vid = this.add.video(400, 300, 'introVideo');
        vid.play(false);
        vid.setPaused(false);
        this.config.skipKeys.forEach((key, i) => {
            this.keyObjects[i] = this.input.keyboard.addKey(key)
            this.keyObjects[i].once('down', () => {
                // Skip video
                vid.setPaused(true);
                this.scene.start('FirstScene');
            })
        })
        vid.on('complete', this.changescene, this);
    }

    changescene(){
        this.scene.start('Pasillo1Scene');
    }



}