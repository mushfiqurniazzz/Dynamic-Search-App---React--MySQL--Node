//import express for using the express route declaration method
const express = require("express");
const router = express.Router();

const { AddUser, GetUsers } = require("../Controllers/AppControllers");

router.post("/adduser", AddUser);
router.get("/getusers", GetUsers)

module.exports = router