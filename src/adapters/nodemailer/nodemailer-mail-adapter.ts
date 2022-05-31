import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";



const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ceb1b26bc4ea42",
    pass: "9d8ed6e7898581",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe do Meu App <oi@gmail.comment>",
      to: "Claudio Lins <klaulins@gmail.com>",
      subject,
      html: body,
    });
  }
}
