const express = require('express');
const registeredEventController = require("../controllers/registeredEventController");
const registeredEventRouter = express.Router();

registeredEventRouter.get("/:userId", registeredEventController.getRegisteredEventsByUserId);

registeredEventRouter.post("/:userId", registeredEventController.registerForEvent);

registeredEventRouter.delete("/:userId", registeredEventController.deregisterFromEvent);


module.exports = registeredEventRouter