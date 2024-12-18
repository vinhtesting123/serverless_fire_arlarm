// Kết nối tới MQTT WebSocket endpoint
const WebSocket = require('ws');

const ws = new WebSocket('ws://broker.hivemq.com:8000/mqtt');

// Khi kết nối thành công
ws.on('open', function open() {
    console.log('Đã kết nối tới MQTT WebSocket');
    // Đăng ký vào topic
    ws.send(JSON.stringify({
        "type": "subscribe",
        "topic": "vinh/hello"
    }));
});

// Nhận dữ liệu từ topic
ws.on('message', function incoming(data) {
    console.log('Dữ liệu nhận được:', data);

    const messageData = JSON.parse(data);

    // Kiểm tra và xử lý dữ liệu
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
});

// Nếu có lỗi xảy ra
ws.on('error', function error(err) {
    console.log('Lỗi kết nối:', err);
});
