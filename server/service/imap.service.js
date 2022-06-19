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


//TODO: Parse all messages
const parseUserMessagesToDB = (imap ) => {
  return new Promise((resolve, reject) => {
    // Получить список всех ящиков
    // Каждый ящик открыть и порционно загружать письма по N штук
    // Когда N штук загрузилось - распарсить их в базу данных
    // Повторять пока ящик не кончится
  })
}

const getBoxNames = (imap) => {
  return new Promise((resolve, reject) => {
    imap.getBoxes( (err, boxes) => {
      if(err) reject(err);
      resolve(boxes);
    })
  })
}

const openBox = (imap, boxName) => {
  return new Promise((resolve, reject) => {
    imap.openBox(boxName, false, (err, box) => {
      if(err) reject(err);

      resolve(box);
    })
  })
}

const disconnectImap = (imap) => {
  return new Promise((resolve, reject) => {
    imap.end();

    imap.once('end', () => {
      resolve('ended')
    })

    imap.once('error', (err) => {
      reject(err);
    })
  })
}

//TODO: Close connection

module.exports = {connectImap, parseUserMessagesToDB, disconnectImap, getBoxNames};