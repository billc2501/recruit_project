import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import * as sgMail from '@sendgrid/mail';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log(data);
        const link =  process.env.BASE_URL + "/invite/" + data.url_path
        sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
        const msg = {
            to: data.recipient_email, // Change to your recipient
            from: process.env.SENDER_EMAIL as string, // Change to your verified sender
            subject: 'Invitation for a Chat',
            html: `<a>Hey, thanks for applying. Please check out ${link}</a>`,
        }
        
        const res =  await sgMail.send(msg)
        
        const application = await prisma.application.update({
            where: { id: data.id },
            data: {
              invite: data.url_path,
              status: "sent",
            }
        });        
        console.log(application);
        
        return NextResponse.json(res, {status: 200});
    }
    catch (error) {
        console.log(error)
        return NextResponse.json(error, {status: 500})
    }
}