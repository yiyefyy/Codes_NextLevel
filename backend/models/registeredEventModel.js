module.exports = (sequelize, DataTypes) => {
    const RegisteredEvents = sequelize.define("RegisteredEvents", {
        status: {
            type:DataTypes.STRING
        },
    })
    return RegisteredEvents;
}