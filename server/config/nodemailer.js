import nodemailer from "nodemailer";

const isDev = process.env.NODE_ENV === "development";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  ...(isDev &&  {
     tls: {
    rejectUnauthorized: false,
  }
  })
});

export default transporter;
