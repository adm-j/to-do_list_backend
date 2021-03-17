const {Router} = require("express");
const userRouter = Router();

const {auth, hashPassword} = require("../middleware/index");
const {addUser, login, logout} = require("../controllers/user");
//import controller

userRouter.post("/users", hashPassword, addUser);             //create user
userRouter.post("/users/login", login)                        //login
userRouter.get("/users/logout", auth, logout)                 //logout

module.exports = {userRouter};