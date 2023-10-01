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

        const eventIdList = registeredEventList.map((registeredEvent) => registeredEvent.eventId);

        // Fetch events using the eventIds
        const eventList = await Events.findAll({
            where: { eventId: eventIdList }
        });

        res.status(200).json({ res: eventList})

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

        // const status = "registered";

        await RegisteredEvents.create( {
            userId,
            eventId,
            // status
        });

        event.increment('signUps');

        if (event.signUps == event.capacity) {
            event.status = 'closed';
            await event.save();
            return res.status(400).json({ error: 'Event is at full capacity' });
        }

        
        res.status(201).json({ res: actualEvent});

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
        const currDate = new Date()

        if (event.date <= currDate) {
            res.status(404).json({ error: "Event has passed!" });
            return;
        }

        await RegisteredEvents.destroy({where: {userId, eventId}});

        event.signUps -= 1;

        if (event.signUps < event.capacity) {
            event.status = 'open';
            await event.save();
            return res.status(200).json({ res: event });
        }

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