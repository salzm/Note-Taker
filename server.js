const express = require("express");
const path = require("path");
const fs = require("fs");

// calling express
const app = express();

// Delcaring port!
const PORT = process.env.PORT || 3001;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//Middleware
app.use(express.static("public"));

//GET REQUESTS

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
