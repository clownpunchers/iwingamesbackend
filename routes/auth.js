const express = require("express");
const {
  login,
  gLogin,
  register,
  checkMe,
} = require("../controller/auth");

const router = express.Router();

router.post("/login", login);
router.post("/google-login", gLogin);
router.post("/register", register);
router.post("/me", checkMe);

module.exports = router;
