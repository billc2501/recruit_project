import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const application = await prisma.application.update({
            where: { invite: data.invite },
            data: {
              status: 'completed'
            }
        });
        
        return NextResponse.json(application, {status: 200});
    }
    catch (error) {
        console.log(error)
        return NextResponse.json(error, {status: 500})
    }
}