const router = require("express").Router();
const { request } = require("express");
const { v4: uuid_v4 } = require("uuid");
const fs = require("fs");
// Create the endpoint that has a POST method
// The full url for this endpoint is http://127.0.0.1:400/car/create`
const dbPath = "./db/cars.json";
router.post("/create", (req, res) => {
  try {
    //  generates an ID for us
    const id = uuid_v4();
    // reads the current carts JSON file
    let cars = read();
    // destructuring the body in the request
    const { make, model, mileage, color } = req.body;
    // packaging up the cars object to be inserted in the array
    const data = { id, make, model, mileage, color };
    // appending our data to the array before saving
    cars.push(data);
    // conducting a file system write and verifying it did save
    const isSaved = save(cars);

    if (!isSaved) {
      throw Error("car not saved");
    }

    res.json({ message: "success from/ create" });
  } catch (error) {
    res.status(500).json;
    message: error;
  }
});

// Create the endpoint that has a get method
// The full url for this endpoint is http://127.0.0.1:400/car/getall`
router.get("/getall", (req, res) => {
  try {
    const cars = read();
    res.json({ cars, message: "success from /getall" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Create the endpoint that has a get method
// The full url for this endpoint is http://127.0.0.1:400/car/getone/`

router.get("/getone/", (req, res) => {
  try {
    let id = req.query.id;
    let foundCar = findByID(id);

    foundCar.length = 0
      ? res.status(404).json({
          message: `No car has been found`,
        })
      : res.status(200).json({
          foundCar,
        });
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error}`,
    });
  }
});

// Create the endpoint that has a delete method
// The full url for this endpoint is http://127.0.0.1:400/car/delete`
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    // TODO: see if the id exists
    const carFound = findByID(id);
    const isCardFound = carFound.length > 0 ? true : false;
    console.log(isCardFound);
    if (!isCardFound) {
      throw Error("car not found");
    }
    // TODO: remove the car
    const cars = read();
    const filteredCars = cars.filter((car) => car.id !== id);

    // TODO: save the cars
    save(filteredCars);
    res.json({ message: "success from /delete", recordDeleted: carFound });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create the endpoint that has a UPDATE method
// The full url for this endpoint is http://127.0.0.1:400/car/update/:id`

router.put("/update/:id", (req, res) => {
  try {
    const id = req.params.id;
    const carFound = findByID(id);
    const isCardFound = carFound.length > 0 ? true : false;
    if (!isCardFound) {
      throw Error("car not found");
    }
    let cars = read();
    let carIndex = cars.findIndex((car) => car.id === id);

    const make = req.body.make;
    const model = req.body.model;
    const mileage = req.body.mileage;
    const color = req.body.color;

    cars[carIndex].make = make;
    cars[carIndex].model = model;
    cars[carIndex].mileage = mileage;
    cars[carIndex].color = color;

    save(cars);

    res.json({ message: "success from/ update" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

function read() {
  const file = fs.readFileSync(dbPath);
  //  converts a JSON object to object literal
  const fileObj = JSON.parse(file);
  return fileObj;
}

function save(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
      return false;
    }
  });
  return true;
}

function findByID(id) {
  const cars = read();
  const filteredCars = cars.filter((car) => car.id === id);
  return filteredCars;
}
module.exports = router;
