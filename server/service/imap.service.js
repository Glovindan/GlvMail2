const Imap = require('node-imap');
const {simpleParser} = require('mailparser');

const connectImap = (imapConfig) => {
  return new Promise((resolve, reject) => {
    const imap = new Imap(imapConfig);

    imap.connect();

    imap.once('ready', () => {
      resolve(imap);
    })

    imap.once('error', (err) => {
      reject(err);
    })
  })
}

module.exports = {connectImap};