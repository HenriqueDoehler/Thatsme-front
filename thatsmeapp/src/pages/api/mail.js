const nodemailer = require("nodemailer");
const { google } = require("googleapis");

export default async function sendEmailN(req, res) {
  const OAuth2 = google.auth.OAuth2;
  const OAuth2_client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );
  OAuth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  const accessToken = await OAuth2_client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.USER_EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: accessToken.token,
    },
  });

  transporter.sendMail(
    {
      from: process.env.EMAIL_USER,
      to: "henriquedoehler1@gmail.com",
      subject: "Contato do site Thats Me",
      text: `${req.body.email} escreveu: ${req.body.message}`,
    },
    (error) => {
      if (error) {
        res.status(500).send("Erro ao enviar email.");
      } else {
        res.status(200).send("Email enviado com sucesso!");
      }
    }
  );
}
