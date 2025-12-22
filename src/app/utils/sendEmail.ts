import nodemailer from "nodemailer";
import ejs from "ejs";
import config from "../config";

export const sendEmail = async (
  to: string,
  template: string,
  subject: string,
  name: string,
  otp?: string,
  title?: string
) => {
 const transporter = nodemailer.createTransport({
     host: "smtp.ionos.co.uk",
     port: 587,
     secure: false,
     auth: {
       user: "noreply@cyberpeers.co.uk",
       pass: "4FROdCo?!)tT",
     },
   });



  try {
    const html = await ejs.renderFile(
      __dirname + "/../static/email_template/" + template + ".ejs",
      {
        otp: otp,
        name: name,
        title: title,
      }
    );
    const mailOptions = {
      from:'"CyberPeers" <noreply@cyberpeers.co.uk>',
      to,
      subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
