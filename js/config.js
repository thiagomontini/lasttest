var url_root = "/spintheglobe";

module.exports = {
    // The root of the app, for the routing resolver
    "root": url_root,

    // The URL for the API that retrieves the flights information
    "apiUrl": "http://www.momondo.com/api/3.0/Flights",

    // The necessary assets for the globe
    "globeMapUrl": url_root + "/img/globe/earthmap1k.jpg",

    // A threshold value to trigger the globe spinning. The smaller it is,
    // the easier it is to trigger the spin
    spinThresold: 50,

    // The number of times the globe spins when the user moves it
    numberOfSpins: 3,

    // The duration of the globe spinning animation, in seconds
    spinDuration: 3,
};
