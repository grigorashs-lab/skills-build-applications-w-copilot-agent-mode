Uncaught ReferenceError: ReactDOM is not defined
    at ./src/index.js (index.js:4:1)
    at options.factory (react refresh:37:1)
    at __webpack_require__ (bootstrap:28:1)
    at startup:7:1
    at startup:7:1Understand this error
WebSocketClient.js:13 WebSocket connection to 'wss://stunning-fishstick-q759grjr9566hx6g6-3000.app.github.dev:3000/ws' failed: 
WebSocketClient @ WebSocketClient.js:13Understand this error
WebSocketClient.js:13 WebSocket connection to 'wss://stunning-fishstick-q759grjr9566hx6g6-3000.app.github.dev:3000/ws' failed: 
WebSocketClient @ WebSocketClient.js:13Understand this error
WebSocketClient.js:13 WebSocket connection to 'wss://stunning-fishstick-q759grjr9566hx6g6-3000.app.github.dev:3000/ws' failed: 
WebSocketClient @ WebSocketClient.js:13Understand this error
WebSocketClient.js:13 WebSocket connection to 'wss://stunning-fishstick-q759grjr9566hx6g6-3000.app.github.dev:3000/ws' failed: 
WebSocketClient @ WebSocketClient.js:13Understand this error
WebSocketClient.js:13 WebSocket connection to 'wss://stunning-fishstick-q759grjr9566hx6g6-3000.app.github.dev:3000/ws' failed: 
WebSocketClient @ WebSocketClient.js:13Understand this error
WebSocketClient.js:13 WebSocket connection to 'wss://stunning-fishstick-q759grjr9566hx6g6-3000.app.github.dev:3000/ws' failed: 
WebSocketClient @ WebSocketClient.js:13Understand this error
WebSocketClient.js:13 WebSocket connection to 'wss://stunning-fishstick-q759grjr9566hx6g6-3000.app.github.dev:3000/ws' failed: ---
applyTo: "octofit-tracker/frontend/**"
---
# Octofit-tracker Fitness App React frontend Guidelines

## REACT Frontend App structure

Make sure in all commands we point to the `octofit-tracker/frontend` directory

```bash
npx create-react-app octofit-tracker/frontend --template cra-template --use-npm

npm install bootstrap --prefix octofit-tracker/frontend

# Add the Bootstrap CSS import at the very top of src/index.js:
sed -i "1iimport 'bootstrap/dist/css/bootstrap.min.css';" octofit-tracker/frontend/src/index.js

npm install react-router-dom --prefix octofit-tracker/frontend

```

## Images for the OctoFit Tracker App

The image to use for the app is in the root of this repository docs/octofitapp-small.png
