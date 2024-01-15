const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileupload());
app.use(cors());

app.get('/',(req,res)=>{
    res.render("home");
})

app.post('/upload',(req,res)=>{
     const title=req.body.title;;
     const description=req.body.description;
     const file=req.files.file;
     const filename=file.name;
     const filepath="/file"+filename;
     file.mv(filepath,(err)=>{
        if (err){
            console.log(err);
            res.statue(500).send("occured an error");
        } 
        const fileresult=uploadfiletoIpfs(filepath);
        const filecid=fileresult.cid.toString();

        const metadata{
            title:title,
            description:description,
            image:"http://ipfs.io/ipfs"+filecid+filename
        }
        const Result=uploadJSONToIpfs(metadata);
        const metadatacid=Result.cid.toString();

        await mint("123456","https://ipfs.io/ipfs/"+metadatacid);

        res.Json{
            message:"upload success",
            metadata:metadata

        }
     });
    
});

app.leson(3000,=>{
    console.log("server is running on port 3000");
})


import {ethers,JsonRpcProviders}from 'ethers';
import fs from 'fs';

await function mint(to,uri){
    const Provider=new JsonRpcProvider("https://rinkeby.infura.io/v3/YOUR-PROJECT-ID");
    const contractaddress="123456789987654321";
    const singer=Provider.getSinger();
    const abi=Json.Prase(fs.readFileSync("./contractABI.json"));
    const contract=new ethers.Contract(contractaddress,abi,singer);
    const result=contract.mint(to,uri);
    console.log(result.hash)
}


function uploadfiletoIpfs(filepath){
    const file=fs.readFileSync(filepath);
    const result=ipfs.add(Path:filepath,content:file)
}