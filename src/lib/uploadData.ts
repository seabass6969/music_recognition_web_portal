
// https://www.geeksforgeeks.org/how-can-javascript-upload-a-blob/
export default async function uploadData(datas: Blob){
    const data = new FormData();
    data.append("file", datas)
    const response = await fetch('/api/data_upload', {
        // headers: {'content-Type': 'multipart/form-data'},
        method: "post",
        body: data
    })
    console.log(await response.json())
    
}
