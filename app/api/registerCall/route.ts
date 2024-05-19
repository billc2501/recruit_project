import prisma from '../../../prisma/client'
import { NextRequest, NextResponse } from "next/server";
import Retell from 'retell-sdk';

const retell = new Retell({
    apiKey: process.env.RETELL_API_KEY as string,
  });  

export async function GET(req: NextRequest) {
    try {
        const data = await retell.call.register({
            agent_id: '667c11b0b4843a28ac030ef2ebf0b21e',
            audio_encoding: 's16le',
            audio_websocket_protocol: 'web',
            sample_rate: 24000,
        });
        console.log(data);
        return NextResponse.json({status: 200, data})
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({status: 500})
    }
}