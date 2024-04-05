const { generateAccessToken } = require("../utils/jwt");

class AuthentificationController {
  async login(req, res) {
    try {
      const body = req.body;

      const token = generateAccessToken(body.email);

      return res.status(200).json({ token });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async getMyProfile(req, res) {
    console.log("MY CONTROLLER");

    return res.status(200).json({ user: req.user });
  }
}

module.exports = new AuthentificationController();
