import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../prisma/client'

type applicationProps = {
    position: string,
    candidate_id: number
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const application: applicationProps = JSON.parse(req.body)
    if (req.method == 'POST'){
        try {
            const data = await prisma.application.create({
                data: {
                    position: application.position,
                    status: "created",
                    candidate_id: application.candidate_id,
                }
            })
            return res.status(200).json(data)
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }
}