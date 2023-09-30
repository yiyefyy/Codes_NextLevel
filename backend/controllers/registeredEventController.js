const { Users, RegisteredEvents } = require('../models');

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

module.exports = {getRegisteredEventsByUserId};