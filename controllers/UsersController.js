const prisma = require("../config/prisma");

class UsersController {
  async index(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async store(req, res) {
    try {
      const body = req.body;
      const user = await prisma.user.create({
        data: body,
      });
      return res.status(201).json(user);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  show(req, res) {
    const id = req.params.id;
    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  }

  update(req, res) {
    const id = req.params.id;
    const body = req.body;
    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = body.name;

    return res.json(user);
  }

  delete(req, res) {
    const id = req.params.id;
    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    users = users.filter((user) => user.id !== Number(id));

    return res.json(user);
  }
}

module.exports = new UsersController();
