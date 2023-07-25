const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db_conn");
const { google } = require("googleapis");
const { InviteURL } = require("../util/config");

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

const secretKey = generateSecretKey();

const login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, username],
    async (err, result) => {
      if (result.length === 0) {
        res.json({
          success: false,
          error: "User not found",
        });
        return;
      }

      const user = result[0];
      const passwordMatched = await bcrypt.compare(password, user.password);

      if (!passwordMatched) {
        res.json({
          success: false,
          error: "User name or password is not correct",
        });
        return;
      }

      const accessToken = jwt.sign(
        {
          userid: user.id,
          email: user.email,
        },
        secretKey,
        {
          expiresIn: "1d",
        }
      );

      res.json({
        success: true,
        accessToken,
      });
    }
  );
};

const gLogin = async (req, res) => {
  const { access_token } = req.body;
  const client = new google.auth.OAuth2();
  client.setCredentials({ access_token });

  const oauth2 = google.oauth2({ version: "v2", auth: client });
  const { data } = await oauth2.userinfo.get();
  const { id, email, name, picture } = data;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (error, results) => {
    if (results.length > 0) {
      res.json({
        success: true,
        data: results,
      });
      return;
    } else {
      res.json({
        success: false,
        error: "User not found",
      });
    }
  });
};

const register = async (req, res) => {
  const { password, username, email, affiliate, year, month, day } = req.body;

  const dateStr = `${year}-${month}-${day}`;

  const aff_link = InviteURL + "/" + username;
  const salt = await bcrypt.genSalt(10);
  const hpwd = await bcrypt.hash(password, salt);

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (error, results) => {
    if (results.length > 0) {
      return res.json({
        success: false,
        error: "Email Already Exist",
      });
    }
    const query1 = "SELECT * FROM users WHERE username = ?";
    db.query(query1, [username], async (error, results) => {
      if (results.length > 0) {
        return res.json({
          success: false,
          error: "username Already Exist",
        });
      }
      const query2 = "SELECT * FROM users WHERE username = ?";
      db.query(query2, [affiliate], async (error, results) => {
        const sup_aff = results.length > 0 ? results[0].affiliate : "";
        const query3 = "SELECT * FROM users WHERE username = ?";
        db.query(query3, [sup_aff], async (error, results) => {
          const sub_aff = results.length > 0 ? results[0].affiliate : "";
          const query4 =
            "INSERT INTO users " +
            "(username, email, password, aff_link, affiliate, sup_aff, sub_aff, signup_at ) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
          db.query(
            query4,
            [
              username,
              email,
              hpwd,
              aff_link,
              affiliate,
              sup_aff,
              sub_aff,
              dateStr,
            ],
            async () => {
              const newUser = {
                username,
                email,
                password: hpwd,
              };
              const accessToken = jwt.sign({ user: newUser }, secretKey, {
                expiresIn: "1h",
              });
              res.json({
                success: true,
                accessToken: accessToken,
              });
            }
          );
        });
      });
    });
  });
};

const checkMe = async (req, res) => {
  let defaultReturnObject = {
    authenticated: false,
    user: null,
  };
  let { token } = req.body;

  if (!token) {
    return res.json(defaultReturnObject);
  }

  const decoded = jwt.decode(token, secretKey);
  const response = await findOne({ email: decoded.email });

  if (!response) {
    return res.json(defaultReturnObject);
  }

  if (decoded.exp * 1000 < Date.now()) {
    return res.json(defaultReturnObject);
  }

  res.json({
    authenticated: true,
    user: response,
  });
};

const findOne = async (row) => {
  let sql = "select * from users where email = ?";
  const results = await new Promise((resolve, reject) => {
    db.query(sql, [row.email], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
  return results[0];
};

module.exports = { login, gLogin, register, checkMe };
