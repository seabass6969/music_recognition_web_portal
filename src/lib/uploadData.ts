
// https://www.geeksforgeeks.org/how-can-javascript-upload-a-blob/
export async function upload_data(datas: Blob, queue_id: string){
    const data = new FormData();
    data.append("file", datas)
    data.append("queue_id", queue_id)
    const response = await fetch('/api/data_upload', {
        // headers: {'content-Type': 'multipart/form-data'},
        method: "post",
        body: data
    })
    console.log(await response.json())
    
}

export async function request_id(): Promise<string>{
    const response = await fetch('/api/data_upload_request', {
        // headers: {'content-Type': 'multipart/form-data'},
        method: "get"
    })
    return await response.text()
}

export async function process_file(queue_id: string): Promise<Object>{
    const data = new FormData();
    data.append("queue_id", queue_id)
    const response = await fetch('/api/process_file', {
        // headers: {'content-Type': 'multipart/form-data'},
        method: "post",
        body: data
    })
    return await response.json()
}
