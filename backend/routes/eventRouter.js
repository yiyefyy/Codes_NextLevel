const express = require('express');
const eventController = require("../controllers/eventController");
const eventRouter = express.Router();


eventRouter.post("/add", eventController.addEvent);

eventRouter.post("/signup", eventController.signupForEvent);

eventRouter.post("/update/:eventId", eventController.updateEvent);

eventRouter.post("/status/:eventId", eventController.updateEventStatus);

eventRouter.get("/", eventController.getAllEvents)

eventRouter.get("/:eventId", eventController.getEventById)

module.exports = eventRouter;