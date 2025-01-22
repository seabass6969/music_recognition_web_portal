import { randomUUID, UUID } from 'crypto';
import { writeFile, writeFileSync } from 'fs';
import { json, RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const formData = await request.formData()
    const file: File = (formData.get("file") as File)
    if (file.type == "audio/wav"){
        writeFileSync(`endPoint/${randomUUID()}.wav`, Buffer.from(await file.arrayBuffer()))
        return json({
            success: true
        });
    }else{
        return json({
            success: false
        });
    }
}