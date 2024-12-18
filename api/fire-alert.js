module.exports = (req, res) => {
    try {
        // Kiểm tra xem request có body không và nó có phải là JSON hợp lệ không
        const { temperature, smokeLevel } = req.body;

        if (typeof temperature === 'undefined' || typeof smokeLevel === 'undefined') {
            return res.status(400).json({
                status: "error",
                message: "Dữ liệu không hợp lệ, vui lòng gửi đầy đủ thông tin!"
            });
        }

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
        res.status(500).json({
            status: "error",
            message: "Đã xảy ra lỗi khi xử lý dữ liệu!",
            error: error.message,
        });
    }
};
