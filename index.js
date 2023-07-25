const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest;
    if (file.fieldname === "image") {
      dest = "public/images/";
    } else {
      dest = "public/games/";
    }
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");

const app = express();
const PORT = 4000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors("*"));

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.post(
  "/upload",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "game",
      maxCount: 1,
    },
  ]),

  (req, res) => {
    res.json({
      success: true,
      res: req.files["image"]
        ? req.files["image"][0].filename
        : req.files["game"][0].filename,
    });
  }
);

app.listen(PORT, () => {
  console.log(`server is online on port ${PORT}`);
});
