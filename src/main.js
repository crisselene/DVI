import MainMenu from './MainMenu.js'
import FirstScene from './Escenas/FirstScene.js'
import DialogScene from './Escenas/DialogScene.js'
import IntroScene from './Escenas/IntroScene.js'
//import DialogModalPlugin from './Plugins/DialogModalPlugin.js'
const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
	},
	scene: {
		preload: preload,
		create: create,
		MainMenu,
		FirstScene,
		DialogScene,
		IntroScene
	  }
}

export default new Phaser.Game(config)

function preload () {
	this.load.plugin('DialogModalPlugin', './dialog_plugin.js');
	this.sys.install('DialogModalPlugin');
	console.log(this.sys.dialogModal);
}
function create () {}