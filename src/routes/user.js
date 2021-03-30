const {Router} = require("express");
const userRouter = Router();

const {auth, hashPassword} = require("../middleware/index");
const {addUser, login, logout, fetchUser} = require("../controllers/user");
//import controller

userRouter.post("/users", hashPassword, addUser);             //create user
userRouter.post("/users/login", login)                        //login
userRouter.get("/users/logout", auth, logout)                 //logout
userRouter.get("/user/auth", auth, fetchUser)                 //fetch user on initialisation if logged in

module.exports = {userRouter};