# Gateways managment

This project is about gateways managment. You should be able adding, deleting, updating gateways and display information about them. Also you can add and remove devices from each gateway, no more 10 devices per gateway.

## Available Scripts for server

In the project directory /server, you can run:

## `npm start`

Runs the server.

> In order to run the server, you need in first place, copy the content of `env.tpl` file to a new file named `.env`.

## Available Scripts for client

In the project directory /client, you can run:

### `npm start`

Runs the client app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles the client app in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

Then you should be good serving it with an static server like `serve`

```
npm i -g serve
serve -s build
```
