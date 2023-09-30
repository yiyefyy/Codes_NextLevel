module.exports = (sequelize, DataTypes) => {
    const Feedbacks = sequelize.define("Feedbacks", {
        rating: {
            type:DataTypes.DOUBLE,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    return Feedbacks;
}