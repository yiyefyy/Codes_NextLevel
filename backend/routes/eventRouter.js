const express = require('express');
const eventController = require("../controllers/eventController");
const eventRouter = express.Router();


eventRouter.post("/add", eventController.addEvent);

eventRouter.put("/signup", eventController.signupForEvent);

eventRouter.put("/update/:eventId", eventController.updateEvent);

eventRouter.put("/status/:eventId", eventController.updateEventStatus);

eventRouter.get("/", eventController.getAllEvents)

eventRouter.get("/:eventId", eventController.getEventById)

eventRouter.delete("/delete/:eventId", eventController.deleteEvent)

module.exports = eventRouter;