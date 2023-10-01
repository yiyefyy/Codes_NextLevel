const { Users, Events, RegisteredEvents } = require('../models');
const { Op } = require('sequelize');

const addEvent = async (req, res, next) => {
    try {
        const { eventId, eventName, eventType, description, date, capacity, signUps, status, image } = req.body;

        if (!eventId, !eventName || !eventType || !description || !date || !capacity || signUps == null || !status) {
            res.status(400).json({ error: "Missing field" });
            return;
        }

        const count = await Events.count({
            where: {
                [Op.or]: [
                    { eventId: eventId },
                ],
            },
        });

        if (count !== 0) {
            res.status(400).json({ error: "Event already exists" });
            return;
        }

        const event = await Events.create({
            eventId: eventId,
            eventName: eventName,
            eventType: eventType,
            description: description,
            date: date,
            capacity: capacity,
            signUps: signUps,
            status: status,   
            image: image
        });

        res.status(201).json({ res: event });
    } catch (err) {
        next(err);
    }
};

const getAllEvents = async (req, res, next) => {
    try {
        const eventList = await Events.findAll();
        res.status(200).json({ res: eventList });
    } catch (err) {
        next(err);
    }
}

const getEventById = async (req, res, next) => {
    try {
        const id = req.params.eventId;
        const event = await Events.findByPk(id);
        if (!event) {
            res.status(404).json({ error: "Event does not exist!" });
            return;
        }
        res.status(200).json({ res: event });
    } catch (err) {
        next(err);
    }
}

const updateEventStatus = async (req, res, next) => {
    try {
        const id = req.params.eventId;
        const event = await Events.findByPk(id);

        if (!event) {
            res.status(404).json({ error: "Event does not exist!" });
            return;
        }
        const { status } = req.body

        if (status && typeof status == 'string') {
            event.status = status;
        }

        await event.save();
        res.status(200).json({ message: 'Event status updated successfully', event });

    } catch (err) {
        next(err);
    }
}

const signupForEvent = async (req, res, next) => {
    try {
        const { userId, eventId } = req.body; 
        const user = await Users.findByPk(userId);
        const event = await Events.findByPk(eventId);

        if (!user || !event) {
            return res.status(404).json({ error: 'User or event not found' });
        }

        if (event.status != "open") {
            return res.status(400).json({error: "Event is not available!"})
        }

        const isRegistered = await RegisteredEvents.findOne({
            where: { userId, eventId },
        });

        if (isRegistered) {
            return res.status(400).json({ error: 'User is already registered for the event' });
        }

        await RegisteredEvents.create({
            userId: userId,
            eventId: eventId,
            status: "upcoming"
        });


        event.increment('signUps');

        if (event.signUps == event.capacity) {
            event.status = 'closed';
            await event.save();
            return res.status(400).json({ error: 'Event is at full capacity' });
        }

        await event.save();
        res.status(200).json({ message: 'Signed up for the event successfully', event });
    } catch (err) {
        next(err);
    }
}

const updateEvent = async (req, res, next) => {
    try {
        const id = req.params.eventId;
        const event = await Events.findByPk(id);

        if (!event) {
            res.status(404).json({ error: "Event does not exist!" });
            return;
        }

        const { eventName, eventType, description, date, capacity, image } = req.body;

        if (eventName && typeof eventName == 'string') {
            event.eventName = eventName;
        }

        if (eventType && typeof eventType == 'string') {
            event.eventType = eventType;
        }

        if (description && typeof description == 'string') {
            event.description = description;
        }

        if (date) {
            event.date = date;
        }

        if (capacity && typeof capacity == "number") {
            event.capacity = capacity;
        }

        if (image && typeof image == 'string') {
            event.image = image;
        }

        await event.save()
        res.status(200).json({ res: event });
    } catch (err) {
        next(err);
    }
}

const deleteEvent = async (req, res, next) => {
    try {
        const id = req.params.eventId;
        const event = await Events.findByPk(id);

        if (!event) {
            res.status(404).json({ error: "Event does not exist!" });
            return;
        }

        await Events.destroy({where: {eventId: id}})
        res.sendStatus(204)

    } catch (err) {
        next(err)
    }
}


module.exports = {
    addEvent,
    getAllEvents,
    getEventById,
    signupForEvent,
    updateEventStatus,
    updateEvent,
    deleteEvent
}