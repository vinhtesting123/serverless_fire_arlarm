const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (true) {
    const { to, subject, text } = req.body;

    // Replace with your email credentials
    const emailUser = "21004229@st.vlute.edu.vn"; // Replace with your email
    const emailPass = "J@mahaga456"; // Replace with your email password
    const recipient = "21004229@st.vlute.edu.vn"; // Send to your own email
    const subject = "Test Email Subject"; // Subject line (can be anything)
    const message = "This is a test email body."; // Message body (can be anything)

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Replace with your email provider (e.g., 'gmail', 'yahoo')
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    try {
      // Send the email
      const info = await transporter.sendMail({
        from: `"Your Name" <${emailUser}>`, // Sender address
        to: recipient, // Recipient email (your own)
        subject, // Email subject
        text: message // Email body
      });

      res.status(200).json({ message: "Email sent successfully!", info });
    } catch (error) {
      res.status(500).json({ error: "Error sending email", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
