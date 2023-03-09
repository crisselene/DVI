# 510 por BooGames
## Proyecto universitario (UCM) para DVI

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/crisselene/DVI)

>510 es un videojuego de puzzles creado para la asignatura de "DESARROLLO DE VIDEOJUEGOS MEDIANTE 
>TECNOLOGÍAS WEB 22-23" impartida en la Universidad Complutense de Madrid bajo una compañia 
>ficticia bautizada como "BooGames".

"BooGames" se encuentra formada por:
- Pablo Martínez
- Cristina Díez
- Samuel Rodríguez
- Eros Guerrero

## Descripción

510 es un juego escape room de ambiente tétrico y actual inspirado en la mitología zaragozana. En él, nuestro protagonista deberá sobrevivir a la habitación 510, un lugar propio de leyendas que, en teoría, hacía mucho que desapareció de los pasillos del hotel Corona de Aragón. Un error sitúa a nuestro protagonista como su próximo cliente, e ignorando todo lo que le espera, acepta su destino en aquella habitación. Una vez cruza las medianías de aquella habitación, la puerta desaparece sin previo aviso y nuestro protagonista decide no dejarse invadir por el miedo y comenzar su fuga de aquella tétrica habitación. Deberá cruzar habitaciones, tétricos pasillos e incluso dimensiones para poder regresar a casa.


## Capturas de Pantalla

![Captura1](https://gamedevacademy.org/wp-content/uploads/2018/05/Cross-Road-Game.jpg.webp)

## Tecnologías

510 usa un conjunto de tecnologías y lenguajes de programación para su funcionamiento.

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Phaser3] - Game Framework
- [Bootstrap] - Design
- [Css]
- [JavaScript]
- [Html]
- [jQuery]


## Instalación y Uso

510 no requiere instalación, se puede jugar directamente en [510 Web](https://crisselene.github.io/DVI/) 

## Licencia

![License](https://img.shields.io/badge/license-MIT-green)


   [node.js]: <http://nodejs.org>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>



# Phaser 3 + Vite.js Template
> Make Phaser 3 games with modern frontend tooling.

![License](https://img.shields.io/badge/license-MIT-green)

## Prerequisites

You'll need [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed.

It is highly recommended to use [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm) to install Node.js and npm.

For Windows users there is [Node Version Manager for Windows](https://github.com/coreybutler/nvm-windows).

Install Node.js and `npm` with `nvm`:

```bash
nvm install node

nvm use node
```

Replace 'node' with 'latest' for `nvm-windows`.

## Getting Started

You can clone this repository or use [degit](https://github.com/Rich-Harris/degit) to scaffold the project like this:

```bash
npx degit https://github.com/ourcade/phaser3-vite-template my-folder-name
cd my-folder-name

npm install
```

Start development server:

```
npm run start
```

To create a production build:

```
npm run build
```

Production files will be placed in the `dist` folder. Then upload those files to a web server. 🎉

## Project Structure

```
    .
    ├── dist
    ├── node_modules
    ├── public
    ├── src
    │   ├── HelloWorldScene.js
    │   ├── main.js
	├── index.html
    ├── package.json
```

JavaScript files are intended for the `src` folder. `main.js` is the entry point referenced by `index.html`.

Other than that there is no opinion on how you should structure your project.

There is an example `HelloWorldScene.js` file that can be placed inside a `scenes` folder to organize by type or elsewhere to organize by function. For example, you can keep all files specific to the HelloWorld scene in a `hello-world` folder.

It is all up to you!

## Static Assets

Any static assets like images or audio files should be placed in the `public` folder. It'll then be served from the root. For example: http://localhost:8000/images/my-image.png

Example `public` structure:

```
    public
    ├── images
    │   ├── my-image.png
    ├── music
    │   ├── ...
    ├── sfx
    │   ├── ...
```

They can then be loaded by Phaser with `this.image.load('my-image', 'images/my-image.png')`.

# ESLint

This template uses a basic `eslint` set up for code linting to help you find and fix common problems in your JavaScript code.

It does not aim to be opinionated.

[See here for rules to turn on or off](https://eslint.org/docs/rules/).

## Dev Server Port

You can change the dev server's port number by modifying the `vite.config.js` file. Look for the `server` section:

```js
{
	// ...
	server: { host: '0.0.0.0', port: 8000 },
}
```

Change 8000 to whatever you want.

## License

[MIT License](https://github.com/ourcade/phaser3-vite-template/blob/master/LICENSE)
