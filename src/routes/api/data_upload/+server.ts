import { writeFileSync } from 'fs';
import { json, RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const formData = await request.formData()
    const file: File = (formData.get("file") as File)
    const queue_id = (formData.get("queue_id") as string).trim()
    if (file.type == "audio/wav"){
        const file_name = `/tmp/${queue_id}/0.wav`
        writeFileSync(file_name, Buffer.from(await file.arrayBuffer()))
        return json({
            success: true
        });
    }else{
        return json({
            success: false
        });
    }
}
