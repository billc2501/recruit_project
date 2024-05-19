import prisma from '../../../prisma/client'
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const inviteLink = searchParams.get('invite_link');
        console.log('inviteLinks:', inviteLink);
        if (!inviteLink) {
            return NextResponse.json({ status: 400, message: 'Invite link is missing in the request' });
        }
        const relevantCandidate = await prisma.application.findUnique({
            where: {
                invite: inviteLink
            },
            include : {
                Candidate: true
            }
        })
        return NextResponse.json({relevantCandidate, status: 200})
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({status: 500})
    }
}