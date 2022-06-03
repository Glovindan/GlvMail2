const express = require('express');
const cors = require("cors");
const {connectImap} = require('./service/imap.service');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const db = require('./service/postgres.service');
app.use(cors())
app.use(express.json({extended: true}))

app.use('/messages',require('./routes/messages.routes'))
app.use('/attachments',require('./routes/attachments.routes'))

const imapConfig = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
}
//
// let counter = 0;
//
// app.use('/test', (req, res) => {
//   connectImap(imapConfig)
//     // .then(imap => res.status(200).json("OK"))
//     .then(imap => {
//       imap.openBox('Test', true, () => {
//         const f = imap.seq.fetch('1:3',{
//           bodies: ''
//         });
//
//         f.on('message', msg => {
//           console.log("Сообщение ебать ", counter++);
//         })
//
//         f.on('error', err => {
//           return res.status(400).json(err);
//         })
//       })
//
//       return res.status(200).json("OK")
//     })
//     .catch(err => res.status(400).json(err))
// })
//
// app.use('/test', (req, res) => {
//   db.query('SELECT * FROM public.user').then(result => res.status(200).json(result)).catch(err => res.status(500).json(err))
// })

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})