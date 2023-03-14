
import MainMenu from './MainMenu.js'
import FirstScene from './FirstScene.js'
const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [MainMenu, FirstScene],
}

export default new Phaser.Game(config)
