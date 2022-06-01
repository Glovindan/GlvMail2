const express = require('express');
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json({extended: true}))

app.use('/messages',require('./routes/messages.routes'))
app.use('/attachments',require('./routes/attachments.routes'))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})