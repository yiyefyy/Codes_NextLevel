const express = require('express');
const feedbackController = require("../controllers/feedbackController");
const feedbackRouter = express.Router();


feedbackRouter.post("/feedback", feedbackController.addFeedback);

feedbackRouter.get("/:eventId", feedbackController.getFeedbackByEventId);

feedbackRouter.get("/user/:userId/event/:eventId", feedbackController.getUserFeedbackByEventId);

module.exports = feedbackRouter;