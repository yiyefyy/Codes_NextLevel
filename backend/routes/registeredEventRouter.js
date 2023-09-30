const express = require('express');
const registeredEventController = require("../controllers/registeredEventController");
const registeredEventRouter = express.Router();

registeredEventRouter.get("/:userId", registeredEventController.getRegisteredEventsByUserId);

module.exports = registeredEventRouter