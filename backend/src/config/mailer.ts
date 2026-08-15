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
      }
    : {
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      }
);

export default transporter;
