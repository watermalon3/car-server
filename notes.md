# Getting Started

- Cerate the `package.json` file
- in the teriminal you will use the command `npm init -y`
  - install dependencies
    - `npm i express`
    - `npm i nodmon --save-dev`
    - `npm i .env`
- create a `.gitignore` file
  - add `/node_modules`
  - add `.env`
- create a `.env` file and update your env variables
- up date `package.json` main to app.js
  - i.e. `"start": "node app.js"`
  - add `"dev": "nodemon"` to the file

## Boiler Plate for Starting Server

```js
require("dotenv").config();
const express = require("express");
// const cors = require(`cors`);
const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
  console.log(`[server] running on ${HOST}:${PORT}`);
});
```

## Preparing our server to handle JSON Objects

in the `app.js` file we need to add this line of code before our first route

```js
app.use(express.json());
```

## CRUD (Create, Read, Update, Delete)

- Create : POST
- Read : GET
- Update : PUT or PATCH
- Delete : Delete

## For Routing

For creating a new route you will need to know intended route and start in the `app.js` file

For example:
Route to be built: `http://127.0.0.1:400/car/create`
<br>
`app.js` will handle the `http://127.0.0.1:4000/car` portion
`routes.js` will handle the `/create`

### Boiler Plate for Creating a NEW Controller

```js
const router = require("express").Router();

module.exports = router;
```

### Basic Controller File Complete - Go to app.js and use the new controller

add the following to the `app.js`

```js
const carController = require("./controllers/routes");
app.use("/car", carController);
```

Note: the ` app.use("/car", carController)` needs to go after the `app.use(express.json())`

### Create the final endpoint (barebone) and test it out in Postman

##3 Boiler Plate for Creating a New Route on the Controller

```js
router.post("/create", (req, res) => {
  try {
    res.json({ message: "success from/ create" });
  } catch (error) {
    res.status(500).json({
		message: error;
	});
  }
});
```

## ID Generator uuid

- `npm install uuidv4`
