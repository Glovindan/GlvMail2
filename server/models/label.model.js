const db = require('../service/postgres.service');

const TABLE_NAME = 'public.label';

class LabelModel {
  async constructor(props) {
    if(props) {
      this.id = props.id;
      this.title = props.title;
    }
  }

  static async getLabelsListByUserId(id) {
    const queryResult = await db.query(`
      SELECT 
        *
      FROM
        ${TABLE_NAME}
      WHERE
        "user_id" = '${id}';
    `)

    return queryResult.rows.map(attachment => new LabelModel({
      id: attachment["label_id"],
      title: attachment["title"],
    }))
  }
}

module.exports = LabelModel;