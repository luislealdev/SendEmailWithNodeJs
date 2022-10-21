const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();
const multer = require("multer");
const express = require("express");

var path1;
var path2;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./files");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: Storage,
}).array("files");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end("Something went wrong!");
    } else {
      path1 = req.files[0].path;
      console.log(path1);
      path2 = req.files[1].path;
      console.log(path2);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "luisrrleal@gmail.com",
          pass: process.env.PASS,
        },
      });

      var mensaje =
        "Hola desde nodejs... si estás viendo esto es porque la prueba funcionó.";

      var mailOptions = {
        from: "luisrrleal@gmail.com",
        to: "visualcenter.mkt@gmail.com",
        subject: "Esta es una prueba",
        text: mensaje,
        attachments: [
        //   {
        //     path: path,
        //   },
          {
            path: path1,
          },
          {
            path: path2,
          },
        ],
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email enviado: " + info.response);
        }
      });
    }
  });
});
app.listen(4000, function () {
  console.log("Server is on");
});
