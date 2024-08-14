module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 7,
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "plugins": [
    "import",
    "react"
  ],
  "rules": {
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "warn",
      "single"
    ],
    "no-unused-vars": "off",
    "no-console": [
      "error",
      {
        "allow": [
          "log",
          "warn",
          "error"
        ]
      }
    ],
    "no-empty": [
      "error",
      {
        "allowEmptyCatch": true
      }
    ],
    "semi": [
      "warn",
      "never"
    ],
    "eol-last": "off",
    "comma-dangle": [
      "error",
      "never"
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/display-name": "warn"
  }
}
