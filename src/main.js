
import MainMenu from './MainMenu.js'
import FirstScene from './Escenas/FirstScene.js'
import DialogScene from './Escenas/DialogScene.js'
import IntroScene from './Escenas/IntroScene.js'
import Pasillo1Scene from './Escenas/Pasillo1Scene'
import Pasillo2Scene from './Escenas/Pasillo2Scene'
import Pasillo3Scene from './Escenas/Pasillo3Scene'
import Pasillo4Scene from './Escenas/Pasillo4Scene'
const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
	},
	scene: [MainMenu, FirstScene, DialogScene, IntroScene, Pasillo1Scene,Pasillo2Scene,Pasillo3Scene,Pasillo4Scene],
}

export default new Phaser.Game(config)
