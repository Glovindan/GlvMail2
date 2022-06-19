const db = require('../service/postgres.service');

const TABLE_NAME = 'public.attachment';

class AttachmentModel {
  async constructor(props) {
    if(props) {
      this.id = props.id;
      this.filename = props.filename;
      this.contentType = props.contentType;
    }
  }

  static async getAttachmentsByMessageId(id) {
    const queryResult = await db.query(`
      SELECT 
        *
      FROM
        ${TABLE_NAME}
      WHERE
        "attachment_id" = '${id}';
    `)

    return queryResult.rows.map(attachment => new AttachmentModel({
      id: attachment["attachment_id"],
      filename: attachment["filename"],
      contentType: attachment["content-type"],
    }))
  }
}

module.exports = AttachmentModel;