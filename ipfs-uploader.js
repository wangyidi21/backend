import { create } from "kubo-rpc-client";
import fs from 'fs';


const ipfs = create('http://43.129.194.130:5001')

export async function uploadFileToIPFS(filePath) {
    const file = fs.readFileSync(filePath)
    const result = await ipfs.add({path:filePath,content:file});
    console.log(result);
    return result;
}
//uploadFileToIPFS("files/web3.jpg");
export async function uploadJSONToIPFS(json){
    const result = await ipfs.add({path:"test.json",content:JSON.stringify(json)});
    //console.log(result);
    return result; 
}

//uploadJSONToIPFS({name:"test"})

