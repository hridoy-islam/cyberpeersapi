import nodemailer from "nodemailer";
import ejs from "ejs";
import config from "../config";

export const sendEmailAdmin = async (
  to: string,
  template: string,
  subject: string,
  name: string,
  otp?: string,
  title?: string,
  applicantEmail?: string,
  phone?: string,
  countryOfResidence?: string,
  dob?:string,
  availableFromDate?:string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.co.uk",
    port: 465,
    secure: true,
    auth: {
      user: "contact@cyberpeers.co.uk",
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
        phone: phone,
        email:applicantEmail,
        countryOfResidence: countryOfResidence,
        dob: dob,
        availableFromDate: availableFromDate,
      }
    );
    const mailOptions = {
      from:'"CyberPeers" <contact@cyberpeers.co.uk>',
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
