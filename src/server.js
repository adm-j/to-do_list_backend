require('./connection');
const express = require("express");
const cors = require("cors");
const {userRouter} = require("./routes/user");

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.get("/health", (req, res) => {
    res.status(200).send({message: "API is working!"})
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});