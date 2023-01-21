const db = require("../models");
const Computer = db.computer;

// Create and Save a new Computer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.model) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Computer
  const computer = new Computer({
    model: req.body.model,
    serial_number: req.body.serial_number,
    purchase_date: req.body.purchase_date ? req.body.purchase_date : false,
  });

  // Save Computer in the database
  computer
    .save(computer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Computer.",
      });
    });
};

// Retrieve all Computers from the database.
exports.findAll = (req, res) => {
  const model = req.query.model;
  var condition = model
    ? { model: { $regex: new RegExp(model), $options: "i" } }
    : {};

  Computer.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving computers.",
      });
    });
};

// Find a single Computer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Computer.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Computer with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Computer with id=" + id });
    });
};

// Update a Computer by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Computer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Computer with id=${id}. Maybe Computer was not found!`,
        });
      } else res.send({ message: "Computer was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Computer with id=" + id,
      });
    });
};

// Delete a Computer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Computer.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Computer with id=${id}. Maybe Computer was not found!`,
        });
      } else {
        res.send({
          message: "Computer was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Computer with id=" + id,
      });
    });
};

// Delete all Computers from the database.
exports.deleteAll = (req, res) => {
  Computer.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Computers were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all computers.",
      });
    });
};

// Find all published Computers
exports.findAllPublished = (req, res) => {
  Computer.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving computers.",
      });
    });
};
