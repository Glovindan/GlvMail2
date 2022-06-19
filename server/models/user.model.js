const db = require('../service/postgres.service');
const ConversationModel = require("./conversation.model");
const LabelModel = require("./label.model");
const MessageModel = require("./message.model");

const TABLE_NAME = 'public.user';

class UserModel {
  async constructor(props) {
    if(props) {
      this.id = props.id;
      this.email = props.email;
    }
  }

  static async getUserById(id) {
    return null;
  }

  static async getUserByEmail(email) {
    const queryResult = await db.query(`
      SELECT
        * 
      FROM 
        ${TABLE_NAME} 
      WHERE 
        "email" = '${email}';
    `);

    return new UserModel({
      id: queryResult.rows[0]["user_id"],
      email: queryResult.rows[0]["email"]
    });
  }

  static async createNewUser(email) {
    const queryResult = await db.query(`
      INSERT INTO 
        ${TABLE_NAME}(email) 
      VALUES 
        (${email})
      RETURNING 
        *;
    `);

    return new UserModel({
      id: queryResult.rows[0]["user_id"],
      email: queryResult.rows[0]["email"]
    })
  }

  async getConversations(params= {}) {
    return await ConversationModel.getConversationsByUserId(this.id, params);
  }

  async getLabels() {
    return await LabelModel.getLabelsListByUserId(this.id);
  }

  async getMessages(params) {
    return await MessageModel.getMessagesByConversationId()
  }
}

module.exports = UserModel;