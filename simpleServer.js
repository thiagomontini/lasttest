var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

var config = require("./js/config.js");

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

var port = 8000;

http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;

    if (uri.search(config.root) != 0) {
        console.log("wrong root, correct is '" + config.root + "'");
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("404 Not Found\n");
        res.end();
        return;
    }
    uri = uri.substr(config.root.length);


    var filename;

    if (uri.match(/^\/[^\/]*$/g) || uri == "") {
        filename = path.join(process.cwd(), "public", "index.html");
        console.log("WOOT!", uri);
    }
    else {
        filename = path.join(process.cwd(), "public", uri);
    }

    fs.access(filename, fs.R_OK, function(err) {
        if(err) {
            console.log("not exists: " + filename);
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("404 Not Found\n");
            res.end();
            return;
        }
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        res.writeHead(200, mimeType);

        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);
    });
}).listen(port, function() {
    console.log("Start listening in http://localhost:" + port);
});
