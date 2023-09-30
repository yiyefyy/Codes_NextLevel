const express = require('express');
const feedbackController = require("../controllers/feedbackController");
const feedbackRouter = express.Router();


feedbackRouter.post("/feedback", feedbackController.addFeedback);

feedbackRouter.get("/:eventId", feedbackController.getFeedbackByEventId);

module.exports = feedbackRouter;