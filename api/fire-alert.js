const mqtt = require('mqtt');

// Kết nối đến MQTT broker
const client = mqtt.connect('mqtt://broker.hivemq.com');

// Đăng ký với topic vinh/hello
client.on('connect', () => {
    console.log('Đã kết nối tới MQTT broker');
    client.subscribe('vinh/hello', (err) => {
        if (err) {
            console.log('Không thể đăng ký topic', err);
        }
    });
});

// Xử lý dữ liệu nhận được từ MQTT
client.on('message', (topic, message) => {
    if (topic === 'vinh/hello') {
        const messageData = JSON.parse(message.toString());

        // Kiểm tra và xử lý dữ liệu nhận được
        const { temperature, smokeLevel } = messageData;

        if (typeof temperature === 'undefined' || typeof smokeLevel === 'undefined') {
            return {
                status: "error",
                message: "Dữ liệu không hợp lệ, vui lòng gửi đầy đủ thông tin!"
            };
        }

        if (temperature > 60 || smokeLevel > 80) {
            return {
                status: "warning",
                message: "🔥 Cảnh báo cháy! Nhiệt độ hoặc mức khói vượt ngưỡng an toàn."
            };
        } else {
            return {
                status: "safe",
                message: "✅ Mọi thứ an toàn."
            };
        }
    }
});

// Đảm bảo luôn trả về một response hợp lệ từ API
module.exports = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Dữ liệu đã được xử lý thành công từ MQTT!"
    });
};
