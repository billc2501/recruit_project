import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import prisma from '../../../prisma/client'
import { NextRequest, NextResponse } from "next/server";
import {v2 as cloudinary} from "cloudinary"
import OpenAI from "openai";
import { Candidate } from "@prisma/client";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string});


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

let resumeText: string = "";

const s3Client = new S3Client({
    region: process.env.REGION ?? "",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.SECRET_ACCESS_KEY ?? "",
    }
})

interface FileWithBuffer extends File {
    arrayBuffer(): Promise<ArrayBuffer>;
  }

async function uploadFile(file: Buffer, fileName: string) {
    const fileBuffer = file;
    const uniqueFileName = `${fileName}-${Date.now()}`
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: uniqueFileName,
        Body: fileBuffer,
        ContentType: 'application/pdf'
    }
    const action = new PutObjectCommand(params);
    await s3Client.send(action)
    return  process.env.S3_URL + uniqueFileName
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const file = formData.get("file") as FileWithBuffer | null
        if (!file){
            return NextResponse.json({error: "Need file"}, {status: 400})
        }
        const buffer = Buffer.from(await file.arrayBuffer())
        //Upload file
        const fileURL = await uploadFile(buffer, file.name);

        //Parse pdf
        await cloudinary.uploader.upload(
            fileURL, { ocr: 'adv_ocr' }, (error, result) => {
                if (error)
                    return NextResponse.json({ error });

                const { textAnnotations } = result!.info.ocr.adv_ocr.data[0];
        
                const extractedText = textAnnotations
                .map((anno: { description: string; }, i: number) => i > 0 && anno.description.replace(/[^0-9a-z.@]/gi, ''))
                .filter((entry: any) => typeof entry === 'string')
                .join(' ');
                resumeText = extractedText;
            }
        );
        
        //Retrieve proper data
        const completion = await openai.chat.completions.create({
            messages: [
                {
                role: "system",
                content: "You are a helpful assistant designed to output JSON.",
                },
                { role: "user", content: `Having information of '${resumeText}', what is the name and email of this individual?` },
            ],
            model: "gpt-3.5-turbo-0125",
            response_format: { type: "json_object" },
        });
        const content = JSON.parse(completion.choices[0].message.content as string);
        if (!content.name || !content.email){
            return NextResponse.json({error: "Missing fields"})
        }
        //Retrieve candidate with same email
        const existingCandidate = await prisma.candidate.findUnique({
            where: {
                email: content.email,
            },
        })
        let candidate;
        //Update candidate or create new candidate
        if (existingCandidate){
            candidate = await prisma.candidate.update({
                where: { email: content.email },
                data: {
                  link: fileURL
                }
            });
        }
        else {
            candidate = await prisma.candidate.create({
                data: {
                    name: content.name,
                    link: fileURL,
                    email: content.email,
                }
            });
        }
        //Create new application
        const selectedPosition = formData.get("position") as string;
        const relevantCandidate = await prisma.candidate.findUnique({
            where: {
                id: candidate.id
            },
            include: {
                Application: {
                    where: {
                        position: selectedPosition,
                    }
                }
            }
        })
        if (relevantCandidate?.Application && relevantCandidate?.Application?.length > 0){
            console.log(relevantCandidate?.Application, "already present")
            return NextResponse.json(fileURL, {status: 201})
        }
        else{
            await prisma.application.create({
                data: {
                    position: selectedPosition,
                    status: "created",
                    candidate_id: candidate.id,
                }
            });
        }
        return NextResponse.json(fileURL, {status: 200})
    }
    catch (error) {
        return NextResponse.json(error, {status: 500})
    }
}

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '3mb',
      },
    },
}
