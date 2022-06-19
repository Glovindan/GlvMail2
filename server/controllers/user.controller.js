const db = require('../db')

class UserController {
  async getOneUser(req, res) {
    const id = req.params.id;
    // const user = await UserModel.getUserById();

    return null;
  }

  async createUser(req, res) {
    return null
  }

  async deleteUser(req, res) {
    return null
  }
}

module.exports = new UserController();