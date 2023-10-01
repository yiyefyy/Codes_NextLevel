module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNULL: false,
            unique:true,
        },
        department: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        designation: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    })

    Users.associate = (models) => {
        Users.belongsToMany(models.Events, { through: models.RegisteredEvents, foreignKey: 'userId' });
        Users.belongsToMany(models.Events, { through: models.Feedbacks, foreignKey: 'userId' });
    }

    return Users;
}