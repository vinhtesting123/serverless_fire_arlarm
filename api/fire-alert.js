import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('vinh/hello', (err) => {
    if (err) {
      console.error('Subscription error:', err);
    }
  });
});

export default function handler(req, res) {
  // Handle incoming MQTT messages
  client.on('message', (topic, message) => {
    if (topic === 'vinh/hello') {
      console.log('Received message:', message.toString());
      res.status(200).json({
        topic,
        message: message.toString(),
      });
    }
  });

  res.status(200).json({ status: 'Waiting for messages...' });
}
