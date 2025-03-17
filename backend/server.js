const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-report", async (req, res) => {
  const { name, shift, report } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "modtager@example.com",
    subject: `Vagtrapport fra ${name}`,
    text: `Navn: ${name}\nVagt: ${shift}\n\nRapport:\n${report}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Vagtrapport sendt!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fejl ved afsendelse af e-mail." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server kører på port ${PORT}`));
