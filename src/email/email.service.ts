import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { IFork } from 'src/fork/fork.type'

@Injectable()
export class EmailService {
    async sendMail(toEmail: string, fork: IFork, categoryName: string) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        })
        await transporter.sendMail({
            from: '"Dima 👻" dima.kazantsev.work@gmail.com',
            to: toEmail,
            html: `<h3>New Fork ${fork.title} in category <i>${categoryName}</i>.</h3>`,
        })
    }
}
