const { Users } = require('../models');
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');

const addUser = async (req, res, next) => {
    try {
        const { username, email, password, name } = req.body;
    
        if (!username || !email || !password || !name) {
            res.status(400).json({error: "Missing field"});
            return;
        }

        const count = await Users.count({
            where: {
              [Op.or]: [
                { email: email },
                { username: username },
              ],
            },
          });

        if (count !== 0) {
            res.status(400).json({ error: "User already exists"});
            return;
        }
    
        const hash = await bcrypt.hash(password, 10);
    
        const user = await Users.create({
            name: name,
            username: username,
            email: email,
            password: hash
        });
    
        res.status(201).json({ res: user});
    } catch (err) {
        next(err);
    }
  };  


const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({error: "Missing field"});
            return;
        }

        const user = await Users.findOne({ where: { username: username } });
    
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

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.userId
        const user = await Users.findByPk(id);
        if (!user) {
            res.status(404).json({error: "User does not exist"});
            return;
        }

        const { username, password, name } = req.body;

        // TODO: make this nicer?
        if (username && typeof username == 'string') {
            const existingUser = await Users.findOne({ where: { username: username }});
    
            if (existingUser && existingUser.userId != id) {
                res.status(400).json({ error: "Username already taken"});
                return;
            }
            user.username = username;
        }

        if (password && typeof password == 'string') {
            const hash = await bcrypt.hash(password, 10);
            user.password = hash;
        }

        if (name && typeof name == 'string') {
            user.name = name;
        }

        await user.save();
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
    getUserById,
    updateUser,
    deleteUser
}