import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to:string, html:string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "nipa.farzana87@gmail.com",
      pass: config.gmail_smtp_password,
    },
  });

  await transporter.sendMail({
    from: 'nipa.farzana87@gmail.com', // sender address
    to,
    subject: "Change your password", // Subject line
    text: "Reset your password with 10mins", // plain text body
    html
  });
}

