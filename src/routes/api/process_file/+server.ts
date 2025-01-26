import { json, RequestHandler} from '@sveltejs/kit';
import {exec} from 'child_process'

export const POST: RequestHandler = async ({ request }) => {
    return new Promise(async (resolve, _) => {
        const formData = await request.formData()
        const queue_id = (formData.get("queue_id") as string).trim()
        exec(`python ../music_recognition_main/main.py ${'0'} ${queue_id}`, (error, stdout, stderr) => {
            if (error) {
                return resolve(
                    json({
                            success: false,
                            output: stderr 
                        }, {status: 500})
                )
            }
            try{
                const output = JSON.parse(stdout)
                if (output["error"]){
                    return resolve(
                        json({
                                success: false,
                                output: stderr 
                            }, {status: 500})
                    )
                }else{
                    return resolve(
                        json({
                                success: true,
                                output: output
                            }, {status: 200})
                    )
                }
            }catch {
                return resolve(
                    json({
                            success: false,
                            output: stderr 
                        }, {status: 500})
                )
            }
        })
    })
}

