var sceneWidth = 2304;

module.exports = {
    "name": "Krabi",
    "lat": 98.4334108,
    "lon": 8.0404036,
    "sceneWidth": sceneWidth,
    "sceneHeight": 1440,
    "objects": [
        {
            "id": "background",
            "image": "img/krabi/Krabi_Back.jpg",
            "position": [0, 0]
        },
        {
            "id": "cloud1",
            "image": "img/krabi/Clouds.json",
            "frames": ["img/krabi/Clouds_1.png"],
            "position": [91, 62]
        },
        {
            "id": "cloud2",
            "image": "img/krabi/Clouds.json",
            "frames": ["img/krabi/Clouds_2.png"],
            "position": [453, 19]
        },
        {
            "id": "cloud3",
            "image": "img/krabi/Clouds.json",
            "frames": ["img/krabi/Clouds_3.png"],
            "position": [518, 59]
        },
        {
            "id": "cloud4",
            "image": "img/krabi/Clouds.json",
            "frames": ["img/krabi/Clouds_4.png"],
            "position": [1045,  9]
        },
        {
            "id": "cloud5",
            "image": "img/krabi/Clouds.json",
            "frames": ["img/krabi/Clouds_5.png"],
            "position": [1327, 70]
        },
        {
            "id": "cloud6",
            "image": "img/krabi/Clouds.json",
            "frames": ["img/krabi/Clouds_6.png"],
            "position": [1431, 72]
        },
        {
            "id": "cloud7",
            "image": "img/krabi/Clouds.json",
            "frames": ["img/krabi/Clouds_7.png"],
            "position": [1692, 25]
        },
        {
            "id": "cloud8",
            "image": "img/krabi/Clouds.json",
            "frames": ["img/krabi/Clouds_8.png"],
            "position": [1705, 64]
        },
        {
            "id": "cloud9",
            "image": "img/krabi/Clouds.json",
            "frames": ["img/krabi/Clouds_9.png"],
            "position": [1806, 19]
        },
        {
            "id": "cloud10",
            "image": "img/krabi/Clouds.json",
            "frames": ["img/krabi/Clouds_10.png"],
            "position": [2022, 67]
        }
    ],
    "hitAreas": [],
    "config": {
        "cloud": {
            "speed": 70,
            "yMin": 0,
            "yMax": 350,
            "sceneWidth": sceneWidth,
            "speedVariance": 0.5
        }
    }
};
