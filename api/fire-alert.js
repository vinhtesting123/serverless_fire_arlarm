module.exports = (req, res) => {
    // Lấy dữ liệu từ thiết bị IoT
    const { temperature, smokeLevel } = req.body;

    // Kiểm tra điều kiện cảnh báo cháy
    if (temperature > 60 || smokeLevel > 80) {
        res.status(200).json({
            status: "warning",
            message: "🔥 Cảnh báo cháy! Nhiệt độ hoặc mức khói vượt ngưỡng an toàn.",
        });
    } else {
        res.status(200).json({
            status: "safe",
            message: "✅ Mọi thứ an toàn.",
        });
    }
};
