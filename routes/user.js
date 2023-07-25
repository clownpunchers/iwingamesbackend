const express = require("express");
const {
  getGames,
  getPlayers,
  setAdsClks,
  getAffShare,
  getTours,
  getPrizes,
  updateProfile,
  getUserInfo,
  getCategories,
} = require("../controller/user");

const router = express.Router();

router.post("/getGames", getGames);
router.post("/getPlayers", getPlayers);
router.post("/setAdsClks", setAdsClks);
router.post("/getAffShare", getAffShare);
router.post("/getTours", getTours);
router.post("/getPrizes", getPrizes);
router.post("/updateProfile", updateProfile);
router.post("/getUserInfo", getUserInfo);
router.post("/getCategories", getCategories);

module.exports = router;
