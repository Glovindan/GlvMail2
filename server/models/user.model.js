const db = require('../service/postgres.service');

const TABLE_NAME = 'public.user';

class UserModel {
  async constructor(props) {
    let user = await this.getUserByEmail(props.email);
    if(!user) user = await this.createNewUser(props.email);

    this.id = user["user_id"];
    this.email = user["email"];
  }

  async getUserByEmail(email) {
    const user = await db.query(`SELECT * FROM ${TABLE_NAME} WHERE "email" = '${email}'`);

    return user.rows[0];
  }

  async createNewUser(email) {
    const user = await db.query(`INSERT INTO ${TABLE_NAME}(email) VALUES (${email})'`);
  }

  //TODO: getUsersConversations;
}

module.exports = UserModel;