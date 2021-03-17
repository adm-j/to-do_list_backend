const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        tokens: [
        {
            token: {
                type: String,
            }
        }]
});

userSchema.methods.generateAuthToken = async function () { //using jsonwebtoken, create token with 1 week expiry and push to db, return the token
    const token = jwt.sign({_id: this.id}, process.env.SECRET, {expiresIn: "1 week"});
    this.tokens.push({token});
    return token;
}

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({username});
    if (!user) {
        throw new Error ("unable to find user");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
        throw new Error("unable to login");
    }

    return user;
}



const User = mongoose.model("User", userSchema);

module.exports = {User};