import { Router, type Request, type Response} from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
router.get("/",(req:Request, res:Response)=>{
    return res.send("Hi from nodejs");
});

router.get("/json",(req:Request, res:Response)=>{
    return res.json({
        message:"Hi from nodejs"
    });
});
router.get("/read_parms_data/:id/:username",(req:Request, res:Response)=>{
    const {id,username} = req.params;   
    return res.json({
        message:`successfully read the data from the url parameters`,
        data:{
            id_sent:id,
            username_sent:username
        }
    });
});         

router.get("/custom_status_code",(req:Request, res:Response)=>{
    return res.status(201).json({
        message:"Hi from nodejs with custom status code"
    });
});

router.get('/html_file',(req:Request, res:Response)=>{
    return res.sendFile(path.join(__dirname,'../../public/html_files/index.html'));
}); 

export default router;