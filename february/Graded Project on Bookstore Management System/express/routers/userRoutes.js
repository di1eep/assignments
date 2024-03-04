const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.get("/profile", authenticateMiddleware, UserController.getProfile);
router.put("/profile", authenticateMiddleware, UserController.updateProfile);

module.exports = router;
