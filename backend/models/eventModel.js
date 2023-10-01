module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define("Events", {
        eventId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
        },
        image: {
            type: DataTypes.STRING,
            allowNULL: true
        }
    })

    Events.associate = (models) => {
        Events.belongsToMany(models.Users, { through: models.RegisteredEvents, foreignKey: 'eventId',  as: 'users'});
        Events.belongsToMany(models.Users, { through: models.Feedbacks, foreignKey: 'eventId', as: 'feedbacks' });
    }

    return Events;
}