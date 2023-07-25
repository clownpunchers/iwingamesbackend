const express = require("express");
const router = express.Router();

const {
  getAffShare,
  setAffShare,
  getUsers,
  getGames,
  getTours,
  addNewGame,
  addNewTour,
  addNewPrize,
  addStage,
  getPrizes,
  updateRow,
  newFeedback,
  delRow,
} = require("../controller/admin");

router.post("/setAffShare", setAffShare);
router.post("/getAffShare", getAffShare);
router.post("/getUsers", getUsers);
router.post("/getGames", getGames);
router.post("/getTours", getTours);
router.post("/getPrizes", getPrizes);
router.post("/addNewGame", addNewGame);
router.post("/addNewTour", addNewTour);
router.post("/addStage", addStage);
router.post("/addNewPrize", addNewPrize);

router.post("/newFeedback", newFeedback);

//utils
router.post("/delRow", delRow);
router.post("/updateRow", updateRow);

module.exports = router;
