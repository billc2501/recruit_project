import prisma from '../../../prisma/client'
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await prisma.application.findMany()
        return NextResponse.json({status: 200, data})
    }
    catch (error) {
        return NextResponse.json({status: 500})
    }
}



// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from '../../../prisma/client'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method == 'GET'){
//     try {
//       const data = await prisma.application.findMany()
//       return res.status(200).json(data)
//     }
//     catch (error) {
//       return res.status(500).json(error)
//     }
//   }
// }