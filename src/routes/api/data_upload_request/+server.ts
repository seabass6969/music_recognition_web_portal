import {exec} from 'child_process'
import {build} from '$lib/build.ts'
export async function GET() {
    return new Promise((resolve, reject) => {
        let exec_command = `python ../music_recognition_main/main.py --queue-request`
        if (build){
            exec_command = `python music_recognition_main/main.py --queue-request`
        }
        exec(exec_command, (error, stdout, stderr) => {
            if (error) {
                return resolve(new Response(stderr, { status: 500 }));
            }
            resolve(new Response(stdout, { status: 200 }));
        });
    });
}
