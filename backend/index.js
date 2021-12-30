const connectToMongo = require("./db");
const express = require("express");
connectToMongo();
const app = express();
const port = 5000;

//if i want to use req.body i have use this code to see the body code in json format
app.use(express.json());

//available  routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("Hello HARRY!");
});

app.listen(port, () => {
  console.log(`Inotes backend at http://localhost:${port}`);
});
