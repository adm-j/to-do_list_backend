const {User} = require("../models/User");


exports.addUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        const savedUser = await user.save();
        const username = savedUser.username
        console.log(username)
        ///console.log(token)

        res.status(200).send({message: "successfully created"});

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
        const token = await user.generateAuthToken();
        
        const userName = user.username
        // const userToken = user.tokens[0]

        console.log("successful login");
        res.status(200).send({userName, token});
    } catch (error) {
        console.log(error);
        res.status(400).send({message: "unable to login"});
    }
};

exports.logout = async (req, res) => {
    console.log(req.user.tokens)
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

exports.fetchUser = async (req, res) => {

    res.status(200).send(req);
}