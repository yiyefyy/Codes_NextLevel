const { Users } = require('../models');
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');

const addUser = async (req, res, next) => {
    try {
        const {userId, firstName, lastName, email, department, designation, password, isAdmin } = req.body;
    
        if ( !userId, !firstName || !lastName || !email || !department || !designation || !password || isAdmin == null) {
            res.status(400).json({error: "Missing field"});
            return;
        }

        const count = await Users.count({
            where: {
              [Op.or]: [
                { email: email },
                { userId: userId },
              ],
            },
          });
          
        if (count !== 0) {
            res.status(400).json({ error: "User already exists"});
            return;
        }
    
        const hash = await bcrypt.hash(password, 10);
    
        const user = await Users.create({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            department: department,
            designation: designation,
            password: hash,
            isAdmin: isAdmin
        });
    
        res.status(201).json({ res: user});
    } catch (err) {
        next(err);
    }
  };  


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({error: "Missing field"});
            return;
        }

        const user = await Users.findOne({ where: { email: email } });
    
        if (!user) {
            res.status(404).json({error: "User does not exist"});
            return;
        } 

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            res.status(401).json({ error: "Wrong password. Please try again!"});
            return;
        }

        res.status(200).json({ res: user})
    } catch (err) {
        next(err);
    }

}

const updateUserPassword = async (req, res, next) => {
    try {
        const id = req.params.userId
        const user = await Users.findByPk(id);
        if (!user) {
            res.status(404).json({error: "User does not exist"});
            return;
        }

        const { password } = req.body;

        if (password && typeof password == 'string') {
            const hash = await bcrypt.hash(password, 10);
            user.password = hash;
        }

        await user.save();
        res.status(200).json({res: user});
    } catch (err) {
        next(err);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const userList = await Users.findAll();
        res.status(200).json({ res: userList});
    } catch (err) {
        next(err);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.userId
        const user = await Users.findByPk(id);
        if (!user) {
            res.status(404).json({error: "User does not exist"});
            return;
        }
        res.status(200).json({res: user});
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const user = await Users.findByPk(id);
        if (!user) {
            res.status(404).json({error: "User does not exist"});
            return;
        }
        await Users.destroy({where: {userId: id}});
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }

};

module.exports = {
    addUser,
    loginUser,
    getAllUsers,
    updateUserPassword,
    getUserById,
    deleteUser
}