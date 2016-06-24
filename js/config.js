module.exports = {
    "sceneWidth": 2304,
    "sceneHeight": 1440,

    "rio": {
        "cloud": {
            "speed": 100,
            "YMin": 0,
            "YMax": 450,
            "speedVariance": 0.5,
        },
        "plane": {
            "speed": 200,
            "YMin": 0,
            "YMax": 450
        },
        "glider": {
            "speed": 150,
            "YMin": 500,
            "YMax": 1000,
            "frequency": 0.005,
            "amplitude": 90
        },
        "cableCar": {
            "tripDuration": 12,
            "points": [
                [851.12, 258.50],
                [1080.75, 482.62],
                [1307.62, 673.75],
                [1404.00, 747.00]
            ],
            "lengths": [
                0.4344469626,
                0.4016484598,
                0.1639045776
            ]
        },
        "seagull": {
            "amplitude": 100,
            "duration": 2
        }
    }
};
