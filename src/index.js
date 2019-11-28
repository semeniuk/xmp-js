class XMP {
    buffer = null;
    constructor(source) {
        if (source instanceof ArrayBuffer) {
            this.buffer = source;
        } else if (typeof source === "string" || source instanceof String) {
            this.fromDataUri(source);
        }
    }

    static dataUriToBuffer(dataUri) {
        let byteString = atob(dataUri.split(",")[1]),
            length = byteString.length,
            out = new ArrayBuffer(length),
            arr = new Uint8Array(out);
        for (let i = 0; i < length; i++) {
            arr[i] = byteString.charCodeAt(i);
        }
        return out;
    }

    static find(source) {
        let buffer;
        if (source instanceof ArrayBuffer) {
            buffer = source;
        } else if (typeof source === "string" || source instanceof String) {
            buffer = XMP.dataUriToBuffer(source);
        }

        let view = new DataView(buffer);

        if (view.getUint16(0, false) !== 0xFFD8) {
            console.warn("not valid JPEG");
            return null;
        }

        const startStr = "<x:xmpmeta",
            startStrLength = startStr.length,
            maxStart = buffer.byteLength - startStrLength,
            endStr = "x:xmpmeta>",
            endStrLength = endStr.length,
            maxEnd = buffer.byteLength - endStrLength;

        let start = 2,
            end = start + startStrLength,
            found = false;

        while (start < maxStart) {
            if (XMP.stringFromBuffer(view, start, startStrLength) == startStr) {
                found = true;
                break;
            } else {
                start++;
            }
        }

        if (!found) {
            console.warn("XMP not found");
            return null;
        }

        while (end < maxEnd) {
            if (XMP.stringFromBuffer(view, end, endStrLength) == endStr) {
                break;
            } else {
                end++;
            }
        }

        end += endStrLength;
        return XMP.stringFromBuffer(view, start, end - start);
    }

    static stringFromBuffer(buffer, start, length) {
        let out = "";
        for (let i = start; i < start + length; i++) {
            out += String.fromCharCode(buffer.getUint8(i));
        }
        return out;
    }

    static parse(xmp) {
        if (!xmp) {
            return null;
        }

        let out = {};
        ["title", "description", "rights", "creator"].forEach(x => {
            let tagRegex = new RegExp(`<dc:${x}>(.*)</dc:${x}>`, "smig"),
                tagMatches = tagRegex.exec(xmp);
            if (tagMatches && tagMatches[1]) {
                // remove all tags
                out[x] = tagMatches[1].replace(/<[^>]*>?/gm, "").trim();
            }
        });

        return out;
    }

    fromDataUri(dataUri) {
        this.buffer = XMP.dataUriToBuffer(dataUri);
    }

    find() {
        return XMP.find(this.buffer);
    }

    parse() {
        let xmp = this.find();
        return XMP.parse(xmp);
    }
}

export default XMP;
