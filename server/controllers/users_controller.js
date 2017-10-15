import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import models from '../models';
require('dotenv').config();
import val from './validator';

const key = process.env.SECRET_KEY;
const validator = new val('users');

class Users {
    signUp(req, res) {
        // if username doesnt already exist and email doesnt already exist
        const verify = validator.userVerifier(req, res, 'signup');
        if (validator.success) {
            return models.Users.findAll()
                .then(members => {
                    if (Object.keys(members).length !== 0) {
                        for (let item in members) {
                            if (members[item].username === req.body.username || members[item].email === req.body.email) {
                                // forbidden
                                res.status(403).json({ error: { message: 'User already exists' } });
                            }
                        }
                    }
                    // created
                    models.Users.create({
                        fullname: req.body.fullname,
                        username: req.body.username,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10) })
                        .then((createdUser) => res.status(201).json({ success: { status: createdUser } }));
                })
                .catch(error => res.status(500).json({ error: { message: error } }));
        }
        return validator.validationError;
    }
    signIn(req, res) {
        const verify = validator.userVerifier(req, res, 'signin');
        if (validator.success) {
            return models.Users
                .findOne({ where: { username: req.body.username } })
                .then(loggedInUser => {
                    if (bcrypt.compareSync(req.body.password, loggedInUser.password)) {
                        const token = jwt.sign({ id: loggedInUser.id }, key, {
                            expiresIn: 60 * 60 * 24 });
                        return res.status(202).json({ success: { status: {
                            User: loggedInUser,
                            Token: token } },
                        });
                    }
                    return res.status(401).json({ error: { message: 'Invalid Login Details' } });
                })
                .catch(error => res.status(401).json({ error: { message: 'User not found' } }));
        }
        return validator.validationError;
    }
    getUsers(req, res) {
        // gets all users' details excluding password
        return models.Users.findAll({ attributes: { exclude: ['password'] } })
            .then(allusers => res.status(200).json({ success: { status: allusers } }))
            .catch(error => res.status(500).json({ error: { message: error } }));
    }
}

export default Users;
