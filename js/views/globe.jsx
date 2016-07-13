var React = require("react");
var THREE = require("three-canvas-renderer");
var browserHistory = require("react-router").browserHistory;
var TweenLite = require("../libs/gsap/TweenMax.js");
var Preloader = require("./preloader.jsx");
var config = require("../config.js");
var sceneData = require("../scenes/sceneData.js");
var pickRandomKey = require("../utils/pickRandomKey.js");

var Globe = React.createClass({
    getInitialState: function() {
        return {
            loading: true
        }
    },

    componentDidMount: function() {
        window.THREE = THREE;

        this.dragging = false;
        this.spinning = false;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 2;

        if (this.props.params.renderer == 'canvas') {
            this.renderer = new THREE.CanvasRenderer({canvas: this.refs.canvas});
        }
        else {
            this.renderer = new THREE.WebGLRenderer({canvas: this.refs.canvas});
        }
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.imageLoader = new THREE.TextureLoader();
        this.imageLoader.load(config.globeMapUrl, this.onModelLoaded);

        window.addEventListener("resize", this.onWindowResize);
    },

    onModelLoaded: function(texture) {
        var geometry = new THREE.SphereGeometry(1, 32, 32);
        var material = new THREE.MeshBasicMaterial({ map: texture });

        this.earthMesh = new THREE.Mesh(geometry, material)
        this.earthMesh.rotation.y = - Math.PI / 2;

        this.earth = new THREE.Object3D();
        this.earth.add(this.earthMesh);

        this.scene.add(this.earth);
        this.animate();

        this.setState({
            loading: false
        });
    },

    animate: function() {
        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(this.animate);
    },

    componentWillUnmount: function() {
        cancelAnimationFrame(this.animationId);
        window.removeEventListener("resize", this.onWindowResize);
    },

    onMouseDown: function(e) {
        this.touchX = e.pageX;
        this.touchY = e.pageY;
        this.initialRotationX = this.earth.rotation.x;
        this.initialRotationY = this.earth.rotation.y;
        this.previousX = this.touchX;
        this.dragging = true;
    },

    onMouseMove: function(e) {
        if (!this.dragging || this.spinning) {
            return;
        }
        this.earth.rotation.x = this.initialRotationX + Math.PI * (e.pageY - this.touchY) / window.innerHeight;
        this.earth.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.earth.rotation.x));
        this.earth.rotation.y = this.initialRotationY + Math.PI * (e.pageX - this.touchX) / window.innerWidth;

        var speedX = e.pageX - this.previousX;
        this.previousX = e.pageX;

        if (Math.abs(speedX) >= config.spinThresold) {
            // Picks a city at random
            this.selectedSceneKey = pickRandomKey(sceneData);
            var lat = -sceneData[this.selectedSceneKey].lat * Math.PI / 180; 
            var lon = sceneData[this.selectedSceneKey].lon * Math.PI / 180;

            // Calculates the final rotation lon angles
            var finalLat;
            if (speedX < 0) {
                finalLat = - 2 * Math.PI * config.numberOfSpins + lat;
            }
            else {
                finalLat = 2 * Math.PI * config.numberOfSpins + lat;
            }

            // Do the animation
            this.spinning = true;
            this.dragging = false;
            TweenLite.to(this.earth.rotation, config.spinDuration, {
                x: lon,
                y: finalLat,
                ease: "Quad.easeOut",
                onComplete: this.onSpinComplete
            });
        }
    },

    onSpinComplete: function() {
        //this.spinning = false;
        browserHistory.push(config.root + "/" + this.selectedSceneKey);
    },

    onMouseUp: function() {
        this.dragging = false;
    },

    onWindowResize: function() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    render: function() {
        var preloader;
        if (this.state.loading) {
            preloader = <Preloader />;
        }
        else {
            preloader = null;
        }

        var canvasStyle = {
            display: this.state.loading ? "none" : "block"
        };

        return (
            <div className="globe"
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}>
                {preloader}
                <canvas ref="canvas" className="globe" style={canvasStyle} />
            </div>
        );
    }
});

module.exports = Globe;
