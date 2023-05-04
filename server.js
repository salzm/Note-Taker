const express = require("express");
const path = require("path");
const fs = require("fs");

// calling express
const app = express();

// Delcaring port!
const PORT = 3001;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//Middleware
app.use(express.static("public"));

//GET REQUESTS

app.get("/api/notes", function (req, res) {
  readFileAsync("./db/db.json", "utf8").then(function (data) {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});
