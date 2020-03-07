<p align="center"><img width="220" src="https://user-images.githubusercontent.com/15949274/76147803-fa6a4300-60b0-11ea-8e5a-f1cc65d6c256.jpg" alt="xmp-js logo"></a></p>

# XMP Parser
Super-light and fast JavaScript lib to read and parse [XMP (Extensible Metadata Platform)](https://en.wikipedia.org/wiki/Extensible_Metadata_Platform) metadata (such as *Title*, *Description* etc.) from JPEG files written, for example, by Adobe Photoshop and Adobe Lightroom.

## Install

```bash
npm i xmp-js
```

## Usage

### In Browser

```js
<script src="dist/xmp.iife.min.js"></script>
<script>
    let input = document.querySelector("input[type='file']");
    input.addEventListener("change", (e) => {
        let file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = e => {
            let xmp = new XMP(e.target.result),
                raw = xmp.find(),
                parsed = xmp.parse();
            // do what you want with `raw` or `parsed` XMP
        };
        reader.readAsDataURL(file);
    })
</script>
```

See `demo.html` for example.

### As ES6 Module

```js
import XMP from "xmp-js";
let xmp = new XMP(< ArrayBuffer or dataURI >),
    raw = xmp.find(),
    parsed = xmp.parse();
// do what you want with `raw` or `parsed` XMP
```

### In Node.js

```js
const XMP = require("xmp-js"),
    fs = require("fs");

fs.readFile(< path to JPEG file >, (err, file) => {
    if (err) {
        console.error("Error while reading the file", err);
    }

    let xmp = new XMP(file),
        raw = xmp.find(),
        parsed = xmp.parse();
    // do what you want with `raw` or `parsed` XMP
});
```

See `demo.js` for example.

## Build

Install `npm` packages:
```bash
npm i
```

Production build with `Rollup.js`:
```bash
npm run build
```

