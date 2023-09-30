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

        const eventIds = registeredEventList.map((registeredEvent) => registeredEvent.eventId);
        const eventList = await Events.findAll({
            where: { eventId: eventIds }, 
        });
        res.status(200).json({ res: eventList})

    } catch (err) {
        next(err)
    }
}

module.exports = {getRegisteredEventsByUserId};