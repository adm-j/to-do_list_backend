const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models/User');

exports.hashPassword = async (req, res, next) => {
    if ("password" in req.body) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
    }
    next();
}

exports.auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer", "");
        const decode = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({_id: decode.id, "tokens.token": token});

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({message: "please login!"});
    }
}