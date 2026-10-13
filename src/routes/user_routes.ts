import { Router, type Request, type Response} from "express";
const router = Router();
let users_db = [
        {
            id:1,
            username:"Houssein",
            age:29
        },
        {
            id:2,
            username:"Hachem",
            age:22
        },
        {
            id:3,
            username:"Ali",
            age:19
        },
    ];

router.get("/",(req:Request, res:Response)=>{
    return res.status(200).json({
        users:users_db
    });
});

router.get("/:id",(req:Request, res:Response)=>{
    const id = parseInt(req.params.id as string);
    const index = users_db.findIndex((user)=>user.id == id);
    if(index==-1){
        return res.status(404).json({
            message:"User not found"
        })
    }
    return res.status(200).json({
        message:"successfully read the user",
        data:users_db[index]
    });
});
    


router.post("/", (req: Request, res: Response) => {
  const { username, age } = req.body ?? {};
  if (typeof username !== "string" || !username.trim() || typeof age !== "number") {
    return res.status(400).json({ message: "username and age are required" });
  }  
  const maxId =
    users_db.length > 0
      ? Math.max(...users_db.map((user) => user.id))
      : 0;

  const newUser = {
    id: maxId + 1,
    username,
    age,
  };

  users_db.push(newUser);

  return res.status(201).json({
    message: "User added",
    data: newUser,
  });
});

router.put("/:id",(req:Request, res:Response)=>{
    const id = parseInt(req.params.id as string);
    const {age} = req.body;
    const index = users_db.findIndex((user)=>user.id == id);
    
    if(index==-1){
        return res.status(404).json({
            message:"User not found"
        })
    }
    console.log(users_db);
    users_db[index]!.age = age;
    console.log(users_db);
    return res.status(200).json({
        message:"User Updated"
    });
});

router.delete("/:id",(req:Request, res:Response)=>{
    const id = parseInt(req.params.id as string);
    const index = users_db.findIndex((user)=>user.id == id);
    
    if(index==-1){
        return res.status(404).json({
            message:"User not found"
        })
    }
    users_db = users_db.filter((user)=>user.id!=id);
    console.log(users_db);
    return res.status(200).json({
        message:"User Deleted"
    });
});

    export default router;