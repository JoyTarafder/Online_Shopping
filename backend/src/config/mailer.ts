import nodemailer from "nodemailer";

const isCustomSmtp = Boolean(process.env.EMAIL_HOST);

const transporter = nodemailer.createTransport(
  isCustomSmtp
    ? {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 465,
        secure: (process.env.EMAIL_PORT || "465") === "465",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      }
    : {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      }
);

export default transporter;
