const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const userRouter = require("./routes/userRouter");
const eventRouter = require("./routes/eventRouter");
const registeredEventRouter = require("./routes/registeredEventRouter");
const feedbackRouter = require("./routes/feedbackRouter");
const {errorHandler} = require("./middleware/errorHandler");
app.use("/users", userRouter);
app.use("/events", eventRouter);
app.use("/registeredevents", registeredEventRouter);
app.use("/feedbacks",feedbackRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});