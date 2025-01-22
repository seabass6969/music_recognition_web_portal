import {exec} from 'child_process'
export async function GET() {
    return new Promise((resolve, reject) => {
        exec('ls', (error, stdout, stderr) => {
            if (error) {
                return resolve(new Response(stderr, { status: 500 }));
            }
            resolve(new Response(stdout, { status: 200 }));
        });
    });
}
