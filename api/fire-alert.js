module.exports = async (req, res) => {
    try {
        // Parse JSON dữ liệu từ body
        const { temperature, smokeLevel } = JSON.parse(req.body);

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
    } catch (error) {
        // Bắt lỗi nếu JSON không hợp lệ hoặc có vấn đề trong hàm
        res.status(500).json({
            status: "error",
            message: "Đã xảy ra lỗi khi xử lý dữ liệu!",
            error: error.message,
        });
    }
};
