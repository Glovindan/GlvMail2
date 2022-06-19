const db = require('../service/postgres.service');
const AttachmentModel = require("./attachment.model");

const TABLE_NAME = 'public.message';

class MessageModel {
  async constructor(props) {
    if(props) {
      this.id = props.id;
      this.subject = props.subject;
      this.bodyText = props.bodyText;
      this.bodyHtml = props.bodyHtml;
      this.date = props.date;
      this.isRead = props.isRead;
      this.hasAttachments = props.hasAttachments;
      this.labelId = props.labelId;
      this.userId = props.userId;
      this.conversationId = props.conversationId;
    }
  }

  static async getMessagesByConversationId(conversationId, params) {
    const filterParamsArr = [];

    if(params.limit) filterParamsArr.push(`LIMIT  ${params.limit}`)
    if(params.offset) filterParamsArr.push(`OFFSET  ${params.offset}`)

    const queryResult = await db.query(`
      SELECT 
        * 
      FROM
        ${TABLE_NAME}
      WHERE
        "conversation_id" = '${conversationId}'
      ${filterParamsArr.join(" ")};
    `)

    return queryResult.rows.map(messageData =>
      new MessageModel({
        id: messageData["message_id"],
        subject: messageData["subject"],
        bodyText: messageData["body_text"],
        bodyHtml: messageData["body_html"],
        date: messageData["date"],
        isRead: messageData["is_read"],
        hasAttachments: messageData["has_attachments"],
        labelId: messageData["label_id"],
        userId: messageData["user_id"],
        conversationId: messageData["conversation_id"],
      })
    );
  }

  static async getMessageById(id) {
    const queryResult = await db.query(`
      SELECT 
        * 
      FROM
        ${TABLE_NAME}
      WHERE
        "message_id" = '${id}'
    `)

    return new MessageModel({
      id: queryResult.rows[0]["message_id"],
      subject: queryResult.rows[0]["subject"],
      bodyText: queryResult.rows[0]["body_text"],
      bodyHtml: queryResult.rows[0]["body_html"],
      date: queryResult.rows[0]["date"],
      isRead: queryResult.rows[0]["is_read"],
      hasAttachments: queryResult.rows[0]["has_attachments"],
      labelId: queryResult.rows[0]["label_id"],
      userId: queryResult.rows[0]["user_id"],
      conversationId: queryResult.rows[0]["conversation_id"],
    })
  }

  async getAttachments() {
    return await AttachmentModel.getAttachmentsByMessageId(this.id);
  }
}

module.exports = MessageModel;