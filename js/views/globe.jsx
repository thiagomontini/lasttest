var React = require("react");

var THREE = require("three");
require("../libs/three/THREEProjector.js")(THREE);
require("../libs/three/THREECanvasRenderer.js")(THREE);
require("../libs/three/THREEObjLoader.js")(THREE);
require("../libs/three/THREEMtlLoader.js")(THREE);

var browserHistory = require("react-router").browserHistory;
var TweenLite = require("../libs/gsap/TweenMax.js");
var Preloader = require("./preloader.jsx");
var config = require("../config.js");
var sceneData = require("../scenes/sceneData.js");
var pickRandomKey = require("../utils/pickRandomKey.js");

function buildAxis( src, dst, colorHex, dashed ) {
        var geom = new THREE.Geometry(),
            mat;

        if(dashed) {
                mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
        } else {
                mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
        }

        geom.vertices.push( src.clone() );
        geom.vertices.push( dst.clone() );
        geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

        var axis = new THREE.Line( geom, mat, THREE.LinePieces );

        return axis;

}

function buildAxes( length ) {
        var axes = new THREE.Object3D();

        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

        return axes;

}

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

        this.ambientLight = new THREE.AmbientLight(0x444444);
        this.scene.add(this.ambientLight);

        this.directionalLight = new THREE.DirectionalLight( 0xffeedd );
        this.directionalLight.position.set( 0, 0, 1 ).normalize();
        this.scene.add( this.directionalLight );

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 4500;

        if (this.props.params.renderer == 'canvas') {
            this.renderer = new THREE.CanvasRenderer({canvas: this.refs.canvas});
        }
        else {
            this.renderer = new THREE.WebGLRenderer({canvas: this.refs.canvas});
        }
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // this.textureLoader = new THREE.TextureLoader();
        // this.textureLoader.load(config.globeMapUrl, this.onTextureLoaded);

        this.mtlLoader = new THREE.MTLLoader();
        this.mtlLoader.load(config.globeMtlUrl, this.onMtlLoaded);

        window.addEventListener("resize", this.onWindowResize);
    },

    onTextureLoaded: function(texture) {
        var geometry = new THREE.SphereGeometry(1, 32, 32);
        var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: true });

        this.earthMesh = new THREE.Mesh(geometry, material);
        this.init();
    },

    onMtlLoaded: function(materials) {
        materials.preload();

        this.objLoader = new THREE.OBJLoader();
        this.objLoader.setMaterials(materials);
        this.objLoader.load(config.globeObjUrl, this.onObjLoaded);
    },

    onObjLoaded: function(object) {
        this.earthMesh = window.earthMesh = object;
        this.earthMesh.position.set(320, 100, -350);
        this.earthMesh.scale.set(0.1, 0.1, 0.1);
        this.init();
    },

    init: function() {
        this.earthMesh.rotation.y = - Math.PI / 2;

        this.earth = new THREE.Object3D();
        this.earth.add(this.earthMesh);
        // this.earth.add(buildAxes(5000));

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
                finalLat = - 2 * Math.PI * (config.numberOfSpins + 1) + lat;
            }
            else {
                finalLat = 2 * Math.PI * config.numberOfSpins + lat;
            }

            // Do the animation
            this.earth.rotation.x %= 2 * Math.PI;
            this.earth.rotation.y %= 2 * Math.PI;
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
