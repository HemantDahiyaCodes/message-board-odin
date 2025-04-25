const express = require("express");
const app = express();
const path = require("node:path");
const assestsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 8000;
app.use(express.static(assestsPath));

let id = 1;
const messages = [
  {
    text: "My wifey has a fatass!",
    user: "Hemant",
    added: new Date(),
    id: id++,
  },
  {
    text: "My hubby loves my fatass",
    user: "Lynn",
    added: new Date(),
    id: id++,
  },
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Mini-message Board", messages: messages });
});

app.get("/new", (req, res) => {
  res.render("form", { title: "New Message", text: "Here will be the form." });
});

app.post("/new", (req, res) => {
  messages.push({
    text: req.body.message,
    user: req.body.name,
    added: new Date(),
  });

  res.redirect("/");
});

app.get("/message/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages.find((message) => message.id === id);
  res.render("message", { message: message });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
