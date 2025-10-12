import { Router } from "express";
import { sendEmail } from "../helpers/mail.helper"; 

const router = Router();

router.get("/test-email", async (req, res) => {
  try {
    await sendEmail(
      "recipient@example.com", 
      "Mailtrap Test Email",
      "<h2>Hello 👋</h2><p>This is a test email sent via Nodemailer + Mailtrap.</p>"
    );

    res.json({ message: "✅ Test email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ message: "Email sending failed", error });
  }
});

export const TestEmailRouter = router;
