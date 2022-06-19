const db = require('../service/postgres.service');
const MessageModel = require("./message.model");

const TABLE_NAME = 'public.conversation';

class ConversationModel {
  async constructor(props) {
    if(props) {
      this.id = props.id;
      this.emailFrom = props.emailFrom;
      this.nameFrom = props.nameFrom;
      this.lastMessageDate = props.lastMessageDate;
    }
  }

  static async getConversationsByUserId(userId, params) {
    const filterParamsArr = [];

    if(params.limit) filterParamsArr.push(`LIMIT  ${params.limit}`)
    if(params.offset) filterParamsArr.push(`OFFSET  ${params.offset}`)

    const conversationsQueryResult = await db.query(`
      SELECT 
        * 
      FROM 
        ${TABLE_NAME} 
      WHERE 
        "user_id" = '${userId}'
      ORDER BY
        last_message_date DESC 
      ${filterParamsArr.join(" ")};
    `);

    return conversationsQueryResult.rows.map(conversationData =>
      new ConversationModel({
        id: conversationData["conversation_id"],
        emailFrom: conversationData["email_from"],
        nameFrom: conversationData["name_from"],
        lastMessageDate: conversationData["last_message_date"],
      })
    );
  }

  static async getConversationById(id) {
    const queryResult = await db.query(`
      SELECT 
        * 
      FROM 
        ${TABLE_NAME} 
      WHERE 
        "conversation_id" = '${id}';
    `);

    return new ConversationModel({
      id: queryResult.rows[0]["conversation_id"],
      emailFrom: queryResult.rows[0]["email_from"],
      nameFrom: queryResult.rows[0]["name_from"],
      lastMessageDate: queryResult.rows[0]["last_message_date"],
    })
  }

  async getMessages(params) {
    return MessageModel.getMessagesByConversationId(this.id, params);
  }
}

module.exports = ConversationModel;