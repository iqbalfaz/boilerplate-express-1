let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time });
});


// app.get("/", (req,res) => {
//   res.send("Hello Express")
// });

// console.log("Hello World");



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
});

// app.get("/json", (req, res) => {
//   res.json({ "message": "Hello json" })
// });

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ "message": "HELLO JSON" })
  } else {
    res.json({ "message": "Hello json" })
  }
});

app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

app.get("/name", (req, res) => {
  let first = req.query.first;
  let last = req.query.last;
  let name = { name: `${first} ${last}` };
  res.json(name);
});

app.post("/name", (req, res) => {
  let first = req.body.first;
  let last = req.body.last;
  let response = { name: `${first} ${last}` }
  res.json(response);
});




































module.exports = app;
