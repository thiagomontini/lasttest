var PIXI = require("pixi.js");

module.exports = {
    startResizeListener: function() {
        window.addEventListener("resize", this.onWindowResize);
    },

    onWindowResize: function() {
        console.log("RESIZE!!", window.innerWidth, window.innerHeight);
    },

    clearResizeListener: function() {
        window.removeEventListener("resize", this.onWindowResize);
    },

    initPixi: function() {
        // Create a renderer instance
        this.renderer = new PIXI.CanvasRenderer(640, 480, { // or autoDetectRenderer
            view: this.refs.canvas
        });

        // The main PIXI container
        this.stage = new PIXI.Container();

        // Starts the animation
        this.animationTick();
    },

    animationTick: function(timestamp) {
        // Renders the PIXI canvas
        this.renderer.render(this.stage);

        // Request the next frame
        this.animationId = requestAnimationFrame(this.animationTick);
    },

    finishPixi: function() {
        clearAnimationFrame(this.animationId);
    }
};
