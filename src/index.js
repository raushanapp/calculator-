const express = require('express');

const userController = require("./controller/userController");
const galleryController = require("./controller/galleryUserController")
const app = express();

app.use(express.json());

app.use("/users", userController);
app.use("/users",galleryController)
module.exports =app;