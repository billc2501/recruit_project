import prisma from '../../../prisma/client'
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await prisma.application.findMany({
            include: {
              Candidate: true
            }
        });
        return NextResponse.json({status: 200, data})
    }
    catch (error) {
        return NextResponse.json({status: 500})
    }
}