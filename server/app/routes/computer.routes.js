module.exports = (app) => {
  const computers = require("../controllers/computer.controller.js");

  var router = require("express").Router();

  // Create a new Computer
  router.post("/", computers.create);

  // Retrieve all computers
  router.get("/", computers.findAll);

  // Retrieve all published computers
  router.get("/published", computers.findAllPublished);

  // Retrieve a single Computer with id
  router.get("/:id", computers.findOne);

  // Update a Computer with id
  router.put("/:id", computers.update);

  // Delete a Computer with id
  router.delete("/:id", computers.delete);

  // Delete all computers
  router.delete("/", computers.deleteAll);

  app.use("/api/computers", router);
};
