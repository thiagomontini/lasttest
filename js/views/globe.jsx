var React = require("react");
var THREE = require("three");

var Globe = React.createClass({
    componentDidMount: function() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1000;

        var geometry = new THREE.BoxGeometry( 200, 200, 200 );
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.renderer = new THREE.WebGLRenderer({canvas: this.refs.canvas});
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.animate();
    },

    animate: function() {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;

        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(this.animate);
    },

    componentWillUnmount: function() {
        cancelAnimationFrame(this.animationId);
    },

    render: function() {
        return <canvas ref="canvas" className="globe" />;
    }
});

module.exports = Globe;
