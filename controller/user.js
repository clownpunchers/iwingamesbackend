const db = require("../db_conn");

const getGames = async (req, res) => {
  let sql = "SELECT * FROM games WHERE status = ?";
  db.query(sql, [1], async (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
      data: results,
    });
  });
};

const getPlayers = async (req, res) => {
  let { username } = req.body;
  let sql =
    "SELECT * FROM users WHERE affiliate = ? OR sup_aff = ? OR sub_aff = ?";
  db.query(sql, [username, username, username], async (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
      data: results,
    });
  });
};

const setAdsClks = async (req, res) => {
  let { name } = req.body;
  let sql = "SELECT * FROM users WHERE name = ?";
  db.query(sql, [name], async (error, results) => {
    if (error) throw error;
    let ads_impression = results[0].ads_impression + 1;
    let query1 = "UPDATE users SET ads_impression = ? WHERE name = ?";
    db.query(query1, [ads_impression, name], async (error, results) => {
      if (error) throw error;
      res.json({ success: true });
    });
  });
};

const getAffShare = async (req, res) => {
  let sql = "SELECT * FROM aff_revenue WHERE id = 1";
  db.query(sql, async (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
      data: results,
    });
  });
};

const getTours = async (req, res) => {
  let sql = "SELECT * FROM tours WHERE status = 1";
  db.query(sql, async (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
      data: results,
    });
  });
};

const getPrizes = (req, res) => {
  let sql = "SELECT * FROM prizes WHERE status = 1";
  db.query(sql, async (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
      data: results,
    });
  });
};

const updateProfile = (req, res) => {
  const { f, val, id } = req.body;

  let sql = `UPDATE users SET ${f} = '${val}' WHERE id = ${id}`;
  db.query(sql, (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
    });
  });
};

const getUserInfo = (req, res) => {
  const { id } = req.body;
  let sql = `SELECT * FROM users WHERE id = ${id}`;

  db.query(sql, (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
      data: results,
    });
  });
};

const getCategories = (req, res) => {
  let sql = "select * from category";
  db.query(sql, (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
      data: results,
    });
  });
};

module.exports = {
  getGames,
  getPlayers,
  setAdsClks,
  getAffShare,
  getTours,
  getPrizes,
  updateProfile,
  getUserInfo,
  getCategories,
};
