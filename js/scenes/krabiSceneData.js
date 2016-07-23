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
            "id": "bird1",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_1.png"],
            "position": [85, 273]
        },
        {
            "id": "bird2",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_2.png"],
            "position": [296, 81]
        },
        {
            "id": "bird3",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_3.png"],
            "position": [368, 72]
        },
        {
            "id": "bird4",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_4.png"],
            "position": [375, 414]
        },
        {
            "id": "bird5",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_5.png"],
            "position": [527, 82]
        },
        {
            "id": "bird6",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_6.png"],
            "position": [601, 255]
        },
        {
            "id": "bird7",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_7.png"],
            "position": [684, 622]
        },
        {
            "id": "bird8",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_8.png"],
            "position": [702, 573]
        },
        {
            "id": "bird9",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_9.png"],
            "position": [841, 1141]
        },
        {
            "id": "bird10",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_10.png"],
            "position": [1395, 284]
        },
        {
            "id": "bird11",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_11.png"],
            "position": [1535, 548]
        },
        {
            "id": "bird12",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_12.png"],
            "position": [1612, 443]
        },
        {
            "id": "bird13",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_13.png"],
            "position": [1747, 386]
        },
        {
            "id": "bird14",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_14.png"],
            "position": [2144, 136]
        },
        {
            "id": "bird15",
            "image": "img/krabi/Birds.json",
            "frames": ["img/krabi/Birds_15.png"],
            "position": [2152, 295]
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
        },
        "birds": {
            "amplitude": 100,
            "duration": 2
        }
    }
};
