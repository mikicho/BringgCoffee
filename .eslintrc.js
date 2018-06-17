module.exports = {
    "env": {
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 6
    },
    "rules": {
        "linebreak-style": ["error", "windows"],
        "object-curly-spacing": ["error", "always"],
        "new-cap": ["error", { "capIsNew": false }],
        "max-len": 0,
    },
    "extends": "google"
};