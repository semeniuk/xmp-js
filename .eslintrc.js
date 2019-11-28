module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true
    },
    "parser": "babel-eslint",
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "globals": {
        "ArrayBuffer": false,
        "Uint8Array": false,
        "DataView": false,
    }
}
