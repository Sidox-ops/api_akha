import nodemailer from 'nodemailer';
// import secrets from file secrets.json at the root of the project
import secrets from '../../../../../secrets.json';

export default function handler(req: any, res: any) {
    const { invited, userEmail } = req.query;

    let content = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invitation à AKHA</title>
        <style>
          /* Styles CSS */
        </style>
      </head>
      <body>
      <img class="logo" src="https://firebasestorage.googleapis.com/v0/b/trafik-33b5a.appspot.com/o/120.png?alt=media&token=6f5f5a89-ae51-4dee-bf23-4090c89b43c1" alt="Logo AKHA">
        <h1>Merci de contribuer à la communauté !</h1>
        <p>Vous avez invité ${invited} à rejoindre notre application par ${userEmail}</p>
      </body>
    </html>
`;


    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: secrets.emailSender,
            pass: secrets.emailSenderPassword,
        },
    });

    let mailOptions = {
        from: "no.reply.akha@gmail.com",
        to: userEmail,
        subject: "Vous avez invité un ami sur AKHA!",
        html: content,
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).json({ message: 'Email sent' });
        }
    });
}
