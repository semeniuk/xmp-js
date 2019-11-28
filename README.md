# XMP Parser
Extract and parse XMP from JPEG

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
// TBD
```

## Build

Install `npm` packages:
```bash
npm i
```

Production build with `Rollup.js`:
```bash
npm run build
```

