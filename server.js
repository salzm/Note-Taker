const express = require("express");
const path = require("path");
const fs = require("fs");
const { error } = require("console");
const uuid = require("./helpers/uuid");

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

//Post!

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNotes = {
      title,
      text,
      id: uuid(),
    };
    fs.readFile("./db/db.json", "utf8", (error, data) => {
      if (error) {
        console.log(error);
      } else {
        const info = JSON.parse(data);
        info.push(newNotes);
        const stringRes = JSON.stringify(info);
        fs.writeFile("./db/db.json", stringRes, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`${newNotes.title} has been written to the file`);
          }
        });
      }
    });
    const response = {
      status: "success",
      body: newNotes,
    };
    res.json(response);
  } else {
    res.json("Please submit note again");
  }
});

// Listener!
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// // Delete Request
// app.delete("/public/notes/:id", (req, res) => {
//   const idDelete = parseInt(req.params.id);
//   readFileAsync("/db/db.json", "utf8")
//     .then(function (data) {
//       const notes = [].concat(JSON.parse(data));
//       const newNotes = [];
//       for (let i = 0; i < notes.length; i++) {
//         if (newNotes !== notes[i].id) {
//           newNotes.push(notes[i]);
//         }
//       }
//       return newNotes;
//     })
//     .then(function (notes) {
//       writefileAsync("/db/db.json", JSON.stringify(notes));
//       res.send("saved notes success");
//     });
// });
