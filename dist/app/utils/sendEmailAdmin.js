"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailAdmin = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const sendEmailAdmin = (to, template, subject, name, otp, title, applicantEmail, phone, countryOfResidence, dob, availableFromDate) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "mail.cyberpeers.co.uk",
        port: 465,
        secure: true,
        auth: {
            user: "noreply@cyberpeers.co.uk",
            pass: "ROr5e205EhQ(P@,C",
        },
    });
    try {
        const html = yield ejs_1.default.renderFile(__dirname + "/../static/email_template/" + template + ".ejs", {
            otp: otp,
            name: name,
            title: title,
            phone: phone,
            email: applicantEmail,
            countryOfResidence: countryOfResidence,
            dob: dob,
            availableFromDate: availableFromDate,
        });
        const mailOptions = {
            from: '"CyberPeers" <noreply@cyberpeers.co.uk>',
            to,
            subject,
            html: html,
        };
        const info = yield transporter.sendMail(mailOptions);
        return info;
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
});
exports.sendEmailAdmin = sendEmailAdmin;
