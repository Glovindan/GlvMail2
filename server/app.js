const express = require('express');
const cors = require("cors");
const {connectImap, getBoxNames} = require('./service/imap.service');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const db = require('./service/postgres.service');
const nodemailer = require("nodemailer");
app.use(cors());
app.use(express.json({extended: true}));

app.use('/messages',require('./routes/messages.routes'));
app.use('/attachments',require('./routes/attachments.routes'));
app.use('/users',require('./routes/users.routes'));
app.use('/labels',require('./routes/labels.routes'));

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
// app.use('/test', async (req, res) => {
//   try {
//     const imap = await connectImap(imapConfig);
//     const boxNames = await getBoxNames(imap);
//     res.status(200).json(boxNames);
//   } catch (e) {
//     res.status(400).json(e.message);
//   }
// })

// app.use('/test', (req, res) => {
//   db.query('SELECT * FROM public.user').then(result => res.status(200).json(result)).catch(err => res.status(500).json(err))
// })

app.use('/test', async (req, res) => {
  try {
    const imap = await connectImap(imapConfig);
    const boxNames = await getBoxNames(imap);
    res.status(200).json(boxNames);
  } catch (e) {
    res.status(400).json(e.message);
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

let transport = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 2525,
  auth: {
    user: 'username@example.com',
    pass: 'password'
  }
});

const mailOptions = {
  from: 'sender@gmail.com', 
  to: 'receiver@gmail.com',
  subject: 'Node Mailer',
  attachments: [
    { filename: 'profile.png', path: './images/profile.png' }
  ]
};

transport.sendMail(mailOptions, function(err, info) {
  if (err) {
    console.log(err)
  } else {
    console.log(info);
  }
});


console.log(transport);