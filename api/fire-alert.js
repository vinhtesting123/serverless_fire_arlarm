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
        try {
            const messageData = JSON.parse(message.toString());

            // Kiểm tra và xử lý dữ liệu nhận được
            const { temperature, smokeLevel } = messageData;

            if (typeof temperature === 'undefined' || typeof smokeLevel === 'undefined') {
                console.log("Dữ liệu không hợp lệ.");
                return;
            }

            if (temperature > 60 || smokeLevel > 80) {
                console.log("🔥 Cảnh báo cháy!");
            } else {
                console.log("✅ Mọi thứ an toàn.");
            }
        } catch (error) {
            console.log('Error parsing message:', error);
        }
    }
});

// API response
module.exports = async (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            message: "Dữ liệu đã được xử lý thành công từ MQTT!"
        });
    } catch (error) {
        console.error("Error in function:", error);
        res.status(500).json({
            status: "error",
            message: "Đã xảy ra lỗi khi xử lý dữ liệu!",
            error: error.message
        });
    }
};
