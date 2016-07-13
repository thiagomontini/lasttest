module.exports = {
    "name": "New York",
    "lat": -74.0058,
    "lon": 40.7127,
    "sceneWidth": 1890,
    "sceneHeight": 1065,
    "objects": [
        {
            "id": "background",
            "images": ["img/ny/NewYork_Back.jpg"],
            "position": [0, 0]
        },
        {
            "id": "ship2",
            "images": ["img/ny/Static_Boat_1.png"],
            "position": [167, 563]
        },
        {
            "id": "ship5",
            "images": ["img/ny/Static_Boat_2.png"],
            "position": [794, 797]
        },
        {
            "id": "ship6",
            "images": ["img/ny/Static_Boat_3.png"],
            "position": [813, 745]
        },
        {
            "id": "ship7",
            "images": ["img/ny/Static_Boat_4.png"],
            "position": [920, 19]
        },
        {
            "id": "ship8",
            "images": ["img/ny/Static_Boat_5.png"],
            "position": [1042, 0]
        },
        {
            "id": "ship9",
            "images": ["img/ny/Static_Boat_6.png"],
            "position": [1052, 134]
        },
        {
            "id": "ship11",
            "images": ["img/ny/Static_Boat_7.png"],
            "position": [1304, 264]
        },
        {
            "id": "ship12",
            "images": ["img/ny/Static_Boat_8.png"],
            "position": [1329, 309]
        },
        {
            "id": "ship13",
            "images": ["img/ny/Static_Boat_9.png"],
            "position": [1334, 315]
        },
        {
            "id": "ship14",
            "images": ["img/ny/Static_Boat_10.png"],
            "position": [1341, 336]
        },
        {
            "id": "ship16",
            "images": ["img/ny/Static_Boat_11.png"],
            "position": [1410, 250]
        },
        {
            "id": "ship17",
            "images": ["img/ny/Static_Boat_12.png"],
            "position": [1475, 635]
        },
        {
            "id": "ship19",
            "images": ["img/ny/Static_Boat_13.png"],
            "position": [1492, 613]
        },
        {
            "id": "ship20",
            "images": ["img/ny/Static_Boat_14.png"],
            "position": [1546, 471]
        },
        {
            "id": "ship22",
            "images": ["img/ny/Static_Boat_15.png"],
            "position": [1690, 333]
        },
        {
            "id": "bridges",
            "images": ["img/ny/NewYork_Bridges.png"],
            "position": [670, 0]
        },
        {
            "id": "park",
            "images": ["img/ny/NewYork_Park.png"],
            "position": [702, 127]
        },
        {
            "id": "island",
            "images": ["img/ny/NewYork_Island.png"],
            "position": [751, 802]
        },
        {
            "id": "statue_of_liberty",
            "images": ["img/ny/NewYork_Statue_of_Liberty.png"],
            "position": [918, 337]
        },
        {
            "id": "helicopter1",
            "images": [
                "img/ny/Copter1_0.png",
                "img/ny/Copter1_1.png",
                "img/ny/Copter1_2.png",
                "img/ny/Copter1_3.png",
                "img/ny/Copter1_4.png"
            ],
            "position": [301, 23]
        },
        {
            "id": "helicopter2",
            "images": [
                "img/ny/Copter2_0.png",
                "img/ny/Copter2_1.png",
                "img/ny/Copter2_2.png",
                "img/ny/Copter2_3.png",
                "img/ny/Copter2_4.png"
            ],
            "position": [1048, 11]
        },
        {
            "id": "helicopter3",
            "images": [
                "img/ny/Copter3_0.png",
                "img/ny/Copter3_1.png",
                "img/ny/Copter3_2.png",
                "img/ny/Copter3_3.png",
                "img/ny/Copter3_4.png"
            ],
            "position": [1507, 85]
        },
        {
            "id": "cloud1",
            "images": ["img/common/cloud01.png"],
            "position": [-121, 408]
        },
        {
            "id": "cloud2",
            "images": ["img/common/cloud02.png"],
            "position": [31, 128]
        },
        {
            "id": "cloud3",
            "images": ["img/common/cloud03.png"],
            "position": [951, 159]
        },
        {
            "id": "cloud4",
            "images": ["img/common/cloud04.png"],
            "position": [1583, 124]
        },
        {
            "id": "cloud5",
            "images": ["img/common/cloud05.png"],
            "position": [1925, 214]
        }
    ],
    "hitAreas": [
        {
            "description": "Statue of Liberty",
            "object": "statue_of_liberty",
            "polygon": [
                1411.420, 337.110,
                1391.530, 375.790,
                1387.110, 410.050,
                1378.260, 425.530,
                1381.580, 492.950,
                1391.530, 510.630,
                1399.260, 572.530,
                1391.530, 612.320,
                1392.630, 793.580,
                1405.890, 814.580,
                1321.890, 849.950,
                1247.840, 788.050,
                1289.840, 769.260,
                1288.740, 652.110,
                1253.370, 628.890,
                1251.160, 603.470,
                1298.680, 595.740,
                1335.160, 554.840,
                1346.210, 542.680,
                1328.530, 527.210,
                1323.000, 501.790,
                1327.420, 484.110,
                1344.000, 467.530,
                1367.210, 469.740,
                1363.890, 382.420,
                1381.580, 353.680,
                1411.420, 337.110
            ]
        }
    ],
    "config": {
        "cloud": {
            "speed": 100,
            "yMin": 0,
            "yMax": 1000,
            "sceneWidth": 1890,
            "speedVariance": 0.5
        },
        "helicopter1": {
            "direction": [60, 30]
        },
        "helicopter2": {
            "direction": [75, 50]
        },
        "helicopter3": {
            "direction": [45, 33]
        },
        "helicopterSpeed": [100, 200]
    }
};
