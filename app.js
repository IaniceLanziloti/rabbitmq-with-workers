const amqp = require('amqplib/callback_api');

const sendMessage = (prefix) => {
  const queueName = 'channel';
  const msg = `[${prefix}]: Hello world !`;

  ch.assertQueue(queueName, { durable: false });
  ch.sendToQueue(queueName, new Buffer.from(msg));

  console.log('[x] Sent %s ', msg);
};

const channel = async function (err, conn) {
  try {
    ch = await conn.createChannel();

    setInterval(() => sendMessage(new Date()), 500);

    setTimeout(() => {
      conn.close();
      process.exit(0);
    }, 10000);
  } catch (err) {
    console.log(err);
  }
};

amqp.connect('amqp://localhost:5672', channel);
