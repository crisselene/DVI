
export default class IntroScene extends Phaser.Scene{

    constructor() {
		super('IntroScene')
	}

    preload(){
		this.load.video('introVideo', 'assets/video/introLogo.mp4', 'loadeddata', false, false);
    }

    create(){
        var vid = this.add.video(400, 300, 'introVideo');
        vid.play(false);
        vid.setPaused(false);
        vid.on('complete', this.changescene, this);
    }

    changescene(){
        this.scene.start('Pasillo1Scene');
    }



}