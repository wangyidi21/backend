import {ethers,JsonRpcProvider} from "ethers";
import fs from "fs";

 export async function mint(to,uri){
    
    console.log("minting");
    const provider = new JsonRpcProvider("http://127.0.0.1:8545");
    const signer =await provider.getSigner();
    const contractAddress="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const abi = JSON.parse(fs.readFileSync("./abis/MyNFT.json"));
    const contract = new ethers.Contract(contractAddress,abi,signer);
    const result = await contract.safeMint(to,uri);
 
    console.log(result.hash);
    
   
}


    
 

 