import mqtt from 'mqtt';

// Kết nối tới broker MQTT
const client = mqtt.connect('mqtt://broker.hivemq.com');

// Cấu hình serverless function để lắng nghe các sự kiện MQTT
export default async function handler(req, res) {
  // Đảm bảo rằng kết nối MQTT đã sẵn sàng
  if (!client.connected) {
    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('vinh/hello', (err) => {
        if (err) {
          console.error('Subscription error:', err);
          res.status(500).json({ error: 'Subscription failed' });
        }
      });
    });
  }

  // Xử lý khi nhận được thông điệp từ topic
  client.on('message', (topic, message) => {
    if (topic === 'vinh/hello') {
      console.log('Received message:', message.toString());
      res.status(200).json({
        topic,
        message: message.toString(),
      });
    }
  });

  // Trả về trạng thái khi chưa nhận được dữ liệu
}
