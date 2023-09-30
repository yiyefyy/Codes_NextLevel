module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define("Events", {
        eventId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        eventName: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        eventType: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNULL: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNULL: false,
        },
        signUps: {
            type: DataTypes.INTEGER,
            allowNULL: false,
            defaultValue: 0,
        },
        status: {   // open, closed, cancelled
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    Events.associate = (models) => {
        Events.belongsToMany(models.Users, { through: models.RegisteredEvents, foreignKey: 'eventId' });
        Events.belongsToMany(models.Users, { through: models.Feedbacks, foreignKey: 'eventId' });
    }

    return Events;
}