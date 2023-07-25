const db = require("../db_conn");

// get affiliate share

const getAffShare = (req, res) => {
  const query = "SELECT * FROM aff_revenue";
  db.query(query, (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
      data: results,
    });
  });
};

// set affiliate share

const setAffShare = (req, res) => {
  const { aff_shr, sup_shr, sub_shr } = req.body;

  const query =
    "UPDATE aff_revenue SET aff_shr = ?, sup_shr = ?, sub_shr = ? WHERE id = 1";
  db.query(query, [aff_shr, sup_shr, sub_shr], (error, results) => {
    if (error) throw error;

    res.json({
      success: true,
    });
  });
};

// get User list

const getUsers = (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
      data: results,
    });
  });
};

// get game list

const getGames = (req, res) => {
  const query = "SELECT * FROM games";

  db.query(query, (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
      data: results,
    });
  });
};

// get tour list

const getTours = (req, res) => {
  const query = "SELECT * FROM tours";

  db.query(query, (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
      data: results,
    });
  });
};

// get prizes

const getPrizes = (req, res) => {
  const sql = "select * from prizes";

  db.query(sql, (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
      data: results,
    });
  });
};

// add new prize

const addNewPrize = (req, res) => {
  const { title, value, quantity, image, summary, expire } = req.body;

  const sql =
    "INSERT INTO prizes (title, value, quantity, image, summary, expire, status ) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [title, value, quantity, image, summary, expire, 1],
    (error, results) => {
      if (error) throw error;
      res.json({
        success: true,
      });
    }
  );
};

// add new game

const addNewGame = (req, res) => {
  const { name, alias, image, filename, summary } = req.body;
  const curTime = new Date().toLocaleDateString();
  const query =
    "INSERT INTO games (name, alias, image, filename, summary, updated_at, status ) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [name, alias, image, filename, summary, curTime, 1],
    (error, results) => {
      if (error) throw error;
      res.json({
        success: true,
      });
    }
  );
};

const addNewTour = (req, res) => {
  const { title, game, status, summary } = req.body;
  const sql =
    "INSERT INTO tours ( title, game, status, summary ) VALUES (?, ?, ?, ?)";

  db.query(sql, [title, game, status, summary], (error, results) => {
    if (error) throw error;
    res.json({
      insertId: results.insertId,
    });
  });
};

const addStage = (req, res) => {
  const {
    countdown,
    min_player,
    max_player,
    buyin,
    balance,
    duration,
    prizes,
  } = req.body;

  const sql =
    "INSERT INTO stages ( countdown, min_player, max_player, buyin, balance, duration, prizes ) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      countdown,
      min_player,
      max_player,
      buyin,
      balance,
      duration,
      JSON.stringify(prizes),
    ],
    (error, results) => {
      if (error) throw error;
      res.json({
        success: true,
        insertId: results.insertId,
      });
    }
  );
};

const delRow = (req, res) => {
  let { id, table } = req.body;
  let query = "DELETE FROM ?? WHERE id = ?";
  db.query(query, [table, id], (error) => {
    if (error) throw error;
    res.json({
      success: true,
    });
  });
};

const updateRow = (req, res) => {
  let { table, val, field, id } = req.body;
  let query = "UPDATE ?? SET ?? = ? WHERE id = ?";
  db.query(query, [table, field, val, id], (error) => {
    if (error) throw error;
    res.json({
      success: true,
    });
  });
};

const newFeedback = (req, res) => {
  const { title, context, email } = req.body;
  const sql =
    "INSERT INTO reports ( email, title, context, recieve_at, status ) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [email, title, context, new Date(), 1], (error, results) => {
    if (error) throw error;
    res.json({
      success: true,
    });
  });
};

module.exports = {
  getAffShare,
  setAffShare,
  getUsers,
  getGames,
  getTours,
  addNewGame,
  addNewPrize,
  getPrizes,
  addStage,
  addNewTour,
  newFeedback,
  updateRow,
  delRow,
};
