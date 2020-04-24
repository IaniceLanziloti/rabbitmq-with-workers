amqp = require('amqplib/callback_api');

const resolve = (msg) => console.log(' [x] Received %s', msg.content.toString());

const channel = (err, conn) => {
  conn.createChannel(function (err, ch) {
    const queueName = 'channel';

    ch.assertQueue(queueName, { durable: false });
    ch.prefetch(1);

    console.log('[*] Waiting for messages in %s. to exit press CTRL+C', queueName);

    ch.consume(queueName, resolve, { noAck: true });
  });
};

amqp.connect('amqp://localhost:5672', channel);
