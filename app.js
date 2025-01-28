const express = require("express");

const app = express();
const port = 3000;
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let messages = [];

app.get("/", (req, res) => {
  res.render("index", { messages }); 
});

app.post("/messages/create", (req, res) => {

  const { auteur, etat } = req.body;
;
  messages.push({ auteur, etat });
  res.redirect("/");
});
app.listen(port, () => {
  console.log("Le serveur tourne sur le port " + port);
});