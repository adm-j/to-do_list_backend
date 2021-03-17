const {User} = require("../models/User");


exports.addUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        const savedUser = await user.save();

        res.status(200).send({savedUser, token});

    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send({message: "user exits"});
        }
        else {
        console.log(error);
        res.status(500).send({message: "Could not connect"});
        }
    }
};



exports.login = async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = user.generateAuthToken();

        console.log("successful login");
        res.status(200).send({user, token});
    } catch (error) {
        console.log(error);
        res.status(400).send({message: "unable to login"});
    }
};

exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj) => {
            return tokenObj.token !== req.token
        });
        await req.user.save();
        res.status(200).send({message: "successfully logged out"});
    } catch (error) {
        console.log(req.tokens);
        console.log(error);
        res.status(500).send({message: "unable to log out"});
    }
};