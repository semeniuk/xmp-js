const XMP = require("./dist/xmp.cjs.js"),
    fs = require("fs");

fs.readFile("assets/logo.jpg", (err, file) => {
    if (err) {
        console.error("Error while reading the file", err);
    }

    let xmp = new XMP(file.buffer),
        parsed = xmp.parse();
    console.log(parsed);
});
