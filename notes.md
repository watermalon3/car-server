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

# Schema Validation

## Getting Started

An ODM (object data mapper)

- Provides a way for us to connect to our database
- Provides us with meethods to crud our database
- Provides us with way to model and schema our data

- to install mongoose
- `npm i mongoose`
- import` mongoose` into our `app.js` file
  import our mongo url from the .env file
- instantiate it with the following options :

```js
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
mongoose
  .connect(MONGO_URL, {
    //  Changes how it parses the connection string
    useNewUrlParser: true,
    // Deprecates old ability to reconnect db
    useUnifiedTopology: true,
  })
  .then(console.log(`Connected to ${MONGO_URL}`))
  .catch((err) => console.log(err));
```

### Schemas

A well-defined document data structure that will be inserted into collection used to crate a model, and based on `SchemaTypes` (aka: data types)

### Model

a constructor built out of the schematic (Schema) It's responsible for all of the CRUB work from respective co

# Authentication

A process where we identify an indiviual's identity using credentailing ssytem (usually username and password)

### bcryptyjs

a dependency that's easy to use which allows us to encrypt and decrypt the data

### Getting started with bcryptjs

- install it using `npm i bcryptjs`
- import it your `auth.js ```file:

```js
const bcrypt = require("bcryptjs");
```

- assign the value of password as it's added to the db to be the result of bcrypt's `hashSync` method
- bcrypt takes two parameters: the string of password to hash, and salt
- salt specifies the amount of times we run the cryptographic algorithm on the password to scramble it

````js
  let newUser = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    ```
````

# Authorization

The process of verifying the authenticity of the user

### Session

A process where server generates a session token based on initial authentication and verifies its authenticity each time the user attempts toa cess protected routes (ie: their emails, or dashboard)

### JWT Token

JSON Web Toke. An encoded token that contains payload that has been encrypted. It can be easily decrypted, so it should **Never** contain sensitive information. Its success is based on teh _secret key_. this key verifies the _authenticity_ of the data. it checks if it's genuine and has not been tampered with.
