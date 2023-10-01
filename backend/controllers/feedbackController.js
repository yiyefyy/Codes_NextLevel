const { Users, Events, Feedbacks } = require('../models');

const addFeedback = async (req, res, next) => {
    try {
        const {rating, comment, userId, eventId} = req.body;
        const event = await Events.findByPk(eventId);
        const user = await Users.findByPk(userId);

        if(!event || !user) {
            res.status(404).json({ error: "User or event not found!" });
            return;
        }
        
        if (!rating || !comment) {
            res.status(400).json({ error: "Missing field" });
            return;
        }

        const existingFeedback = await Feedbacks.findOne({
            where: { userId, eventId },
        });

        if (existingFeedback) {
            res.status(400).json({ error: "User has already provided feedback for this event" });
            return;
        }

        const feedback = await Feedbacks.create( {
            userId,
            eventId,
            rating, 
            comment
        });

        
        res.status(200).json({ res: feedback});

    } catch (err) {
        next(err);
    }
}

const getFeedbackByEventId = async (req, res, next) => {
    try {
        const eventId = req.params.eventId
        const event = await Events.findByPk(eventId);
    
        if (!event) {
            res.status(404).json({ error: "Event does not exist!" });
            return;
        }

        const feedbackList = await Feedbacks.findAll({
            where: {eventId}
        });

        res.status(200).json({ res: feedbackList})

    } catch (err) {
        next(err);
    }
}

const getUserFeedbackByEventId = async (req, res, next) => {
    try {
        const eventId = req.params.eventId
        const userId = req.params.userId;
        const event = await Events.findByPk(eventId);
        const user = await Users.findByPk(userId);
    
        if (!event || !user) {
            res.status(404).json({ error: "User or event does not exist!" });
            return;
        }

        const feedback = await Feedbacks.findOne({
            where: {eventId, userId}
        });

        res.status(200).json({ res: feedback})

    } catch (err) {
        next(err);
    }
}


module.exports = {
    addFeedback,
    getFeedbackByEventId,
    getUserFeedbackByEventId
};