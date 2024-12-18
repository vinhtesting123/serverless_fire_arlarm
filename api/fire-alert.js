module.exports = async (req, res) => {
    try {
        // Check if the request is a POST
        if (req.method !== 'POST') {
            return res.status(405).json({
                status: "error",
                message: "Method Not Allowed. Please use POST."
            });
        }

        // Get the message data from the incoming webhook request body
        const { temperature, smokeLevel } = req.body;

        // Validate the data to ensure the necessary fields are provided
        if (typeof temperature === 'undefined' || typeof smokeLevel === 'undefined') {
            return res.status(400).json({
                status: "error",
                message: "Dữ liệu không hợp lệ, vui lòng gửi đầy đủ thông tin (temperature và smokeLevel)."
            });
        }

        // Check for fire hazards based on the data
        if (temperature > 60 || smokeLevel > 80) {
            return res.status(200).json({
                status: "warning",
                message: "🔥 Cảnh báo cháy! Nhiệt độ hoặc mức khói vượt ngưỡng an toàn."
            });
        } else {
            return res.status(200).json({
                status: "safe",
                message: "✅ Mọi thứ an toàn."
            });
        }
    } catch (error) {
        // Return an error response if something goes wrong
        return res.status(500).json({
            status: "error",
            message: "Đã xảy ra lỗi khi xử lý dữ liệu!",
            error: error.message,
        });
    }
};
