const express = require("express");
const UsersController = require("../controllers/UsersController");

const router = express.Router();

router.get("/users", UsersController.index); // GET /users
router.post("/users", UsersController.store); // POST /users

module.exports = router;
