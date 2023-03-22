
import MainMenu from './MainMenu.js'
import FirstScene from './Escenas/FirstScene.js'
import DialogScene from './Escenas/DialogScene.js'
const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
	},
	scene: [MainMenu, FirstScene, DialogScene],
}

export default new Phaser.Game(config)
