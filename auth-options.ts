// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { Adapter } from 'next-auth/adapters';

const prisma = new PrismaClient()

export const  authOptions = {
  session: {
    maxAge : 60 * 60 * 24 * 365
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    EmailProvider({
      server: {
        host: "smtp.office365.com",
        port: 587,
        auth: {
          user: process.env.NEXTAUTH_OUTLOOK_EMAIL,
          pass: process.env.NEXTAUTH_OUTLOOK_PASSWORD,
        },
        secure: false,
        requireTLS: true,
      },
      from: process.env.NEXTAUTH_OUTLOOK_EMAIL,
      sendVerificationRequest({
        identifier: email,
        url,
        token,
        provider,
      }) {
        return new Promise((resolve, reject) => {
          const { server, from } = provider;
          const transport = nodemailer.createTransport(server);
          const mailOptions = {
            to: email,
            from: process.env.NEXTAUTH_OUTLOOK_EMAIL,
            subject: "เข้าสู่ระบบ PEA S3 Stroggrid",
            text: `เข้าสู่ระบบ PEA S3 Stronggrid โดยคุณสามารถกดได้ที่ Link: ${url}`,
            html: `<p>เข้าสู่ระบบ PEA S3 Stronggrid โดยคุณสามารถกดได้ที่ <a href="${url}">คลิกเพื่อเข้าสู่ระบบ</a></p>`,
          };

          transport.sendMail(mailOptions, (error) => {
            if (error) {
              console.error(error);
              return reject(new Error("SEND_VERIFICATION_EMAIL_ERROR", error));
            }
            resolve();
          });
        });
      },
    }),
  ],
};
