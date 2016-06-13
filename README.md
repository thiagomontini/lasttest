# Spin the Globe - Cheapflights

Repository for the *Spin the Globe* project for Cheapflights


## Tech specs

* [React.js](https://facebook.github.io/react/) as main front-end framework
* [Less](http://lesscss.org/) for CSS compilation
* [CommonJS](http://www.commonjs.org/) as JS module syntax
* [Webpack](https://webpack.github.io/) for JS module bundling


## Initialization 

The project requires [Node.js](https://nodejs.org/) to run the build scripts and the local server, but it's not required in the production environment.

To install the necessary Node.js modules in the project's local environment, run this once from the command line:

```sh
npm install
```


## Build scripts

To build the CSS and JS files:

```sh
npm run build:css
npm run build:js
```


## Watcher scripts

To run the watchers for CSS and JS:

```sh
npm run watch:css
npm run watch:js
```


## Start local server (on port 8000)

```sh
npm run server
```