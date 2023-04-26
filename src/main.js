
import MainMenu from './MainMenu.js'
import FirstScene from './Escenas/FirstScene.js'
import IntroScene from './Escenas/IntroScene.js'
import Pasillo1Scene from './Escenas/Pasillo1Scene.js'
import Pasillo2Scene from './Escenas/Pasillo2Scene.js'
import Pasillo3Scene from './Escenas/Pasillo3Scene.js'
import Pasillo4Scene from './Escenas/Pasillo4Scene.js'
import ColorScene from './Escenas/ColorScene.js'
import Laberinto from './Escenas/Laberinto.js'
import PuertasColoresScene from './Escenas/PuertasColoresScene.js'
const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
	},
	scene: [MainMenu, FirstScene, IntroScene, Pasillo1Scene,Pasillo2Scene,Pasillo3Scene,Pasillo4Scene, ColorScene, PuertasColoresScene, Laberinto],
}

export default new Phaser.Game(config)
