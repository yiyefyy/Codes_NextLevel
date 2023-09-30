const { Users, RegisteredEvents, Events } = require('../models');

const getRegisteredEventsByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const user = await Users.findByPk(userId);
    
        if (!user) {
            res.status(404).json({ error: "User does not exist!" });
            return;
        }

        const registeredEventList = await RegisteredEvents.findAll({
            where: {userId}
        });

        res.status(200).json({ res: registeredEventList})

    } catch (err) {
        next(err)
    }
}

const registerForEvent = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const { eventId} = req.body;
        const event = await Events.findByPk(eventId);
        const user = await Users.findByPk(userId);

        if(!event || !user) {
            res.status(404).json({ error: "User or event not found!" });
            return;
        }

        const registeredEvent = await RegisteredEvents.findOne({
            where: { userId, eventId },
        });

        if (registeredEvent) {
            res.status(400).json({ error: "User has already registered for this" });
            return;
        }

        const status = "upcoming";

        const newEvent = await RegisteredEvents.create( {
            userId,
            eventId,
            status
        });

        
        res.status(200).json({ res: newEvent});

    } catch (err) {
        next(err);
    }
}

const deregisterFromEvent = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const { eventId} = req.body;
        const event = await Events.findByPk(eventId);
        const user = await Users.findByPk(userId);

        if(!event || !user) {
            res.status(404).json({ error: "User or event not found!" });
            return;
        }

        const registeredEvent = await RegisteredEvents.findOne({
            where: { userId, eventId },
        });

        if (!registeredEvent) {
            res.status(404).json({ error: "User has not registered for this" });
            return;
        }

        await RegisteredEvents.destroy({where: {userId, eventId}});
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getRegisteredEventsByUserId,
    registerForEvent,
    deregisterFromEvent
};