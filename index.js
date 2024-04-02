const express = require("express");
const app = express();
const port = 3000;

let users = [
  {
    id: 1,
    name: "Alice",
  },
  {
    id: 2,
    name: "Bob",
  },
];

// INDEX : Read all users
app.get("/users", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
