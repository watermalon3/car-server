const router = require("express").Router();
const { query } = require("express");
const Car = require("../models/Cars");
// Create the endpoint that has a POST method
// The full url for this endpoint is http://127.0.0.1:400/car/create`

router.post("/create", async (req, res) => {
  try {
    const carIncoming = req.body;

    //  Instantiates a new model instance with provided object values
    let newCar = new Car(carIncoming);
    //  save the model document into the collection
    await newCar.save();

    res.status(201).json({
      message: `Car created`,
      newCar,
    });
  } catch (error) {
    res.status(500).json;
    message: error;
  }
});

// Create the endpoint that has a get method
// The full url for this endpoint is http://127.0.0.1:400/car/getall`
router.get("/getall", async (req, res) => {
  try {
    const allCars = await Car.find();
    res.status(200).json(allCars);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Create the endpoint that has a get method
// The full url for this endpoint is http://127.0.0.1:400/car/getone/`

router.get("/getone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findItem = await Car.findById(id);

    res.status(200).json(findItem);
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error}`,
    });
  }
});

// Create the endpoint that has a delete method
// The full url for this endpoint is http://127.0.0.1:400/car/delete`
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findItem = await Car.findByIdAndDelete(id);
    if (!findItem) {
      throw new Error(`Provided id: ${id} does not exist`);
    } else {
      res.status(200).json({
        message: `Car successfully deleted`,
        findItem,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create the endpoint that has a UPDATE method
// The full url for this endpoint is http://127.0.0.1:400/car/update/:id`

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedItem = await Car.updateOne({ _id: id }, { $set: body });

    res.status(200).json({
      message: `Car successfully updated`,
      updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
