import nodemailer from 'nodemailer';
// import secrets from file secrets.json at the root of the project
import secrets from '../../../../../secrets.json';

export default function handler(req: any, res: any) {
    const { userEmail, subject, message } = req.query;

    // res.status(200).json({ userEmail, subject, message });

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
        subject: message,
        text: subject,
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
