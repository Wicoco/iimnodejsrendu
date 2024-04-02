const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

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
  res.json(users);
});

// CREATE : Create a new user
app.post("/users", (req, res) => {
  const body = req.body;
  users.push(body);
  return res.json(body);
});

// SHOW : Read a specific user
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
});

// UPDATE : Update a specific user
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = body.name;

  return res.json(user);
});

// DELETE : Delete a specific user
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  users = users.filter((user) => user.id !== Number(id));

  return res.json(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
