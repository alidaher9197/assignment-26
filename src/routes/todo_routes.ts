import { Router, type Request, type Response} from "express";
const router = Router();
let todos_db = [
        {
            id:1,
            task:"todo1",
            user_id:1
        },
        {
            id:2,
            task:"todo2",
            user_id:2
        },
        {
            id:3,
            task:"todo3",
            user_id:2
        },
    ];

router.get("/",(req:Request, res:Response)=>{
    return res.status(200).json({
        message:"successfully read all the todos",
        data:todos_db
    });
});
router.get("/:id",(req:Request, res:Response)=>{ 
    const id = parseInt(req.params.id as string);
    const index = todos_db.findIndex((todo)=>todo.id == id);
    
    if(index==-1){
        return res.status(404).json({
            message:"todo not found"
        })
    }
    return res.status(200).json({
        message:"successfully read the todo",
        data:todos_db[index]
    }); 
});    
router.get("/user/:user_id", (req: Request, res: Response) => { 
    const user_id = parseInt(req.params.user_id as string);
    
    // Use .filter() to get all todos matching this user ID
    const userTodos = todos_db.filter((todo) => todo.user_id === user_id);
    
    // Check if the array is empty
    if (userTodos.length === 0) {
        return res.status(404).json({
            message: "No todos found for this user"
        });
    }

    return res.status(200).json({
        message: "Successfully retrieved todos for the user",
        data: userTodos
    }); 
});

router.post("/", (req: Request, res: Response) => {
  const { task, user_id } = req.body ?? {};

  if (typeof task !== "string" || !task.trim() || user_id == null) {
    return res.status(400).json({ message: "task and user_id are required" });
  }

  const maxId = todos_db.length
    ? Math.max(...todos_db.map(todo => todo.id))
    : 0;

  const newTodo = { id: maxId + 1, task: task.trim(), user_id };
  todos_db.push(newTodo);

  return res.status(201).json({
    message: "Todo created successfully",
    data: newTodo,
  });
});

router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const { task, user_id } = req.body ?? {};
  if (task !== undefined && typeof task !== "string") {
  return res.status(400).json({
    message: "Task must be a string",
  });
}
  const index = todos_db.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  } 
  todos_db[index]!.task = task ?? todos_db[index]!.task;
  todos_db[index]!.user_id = user_id ?? todos_db[index]!.user_id;
  return res.status(200).json({
    message: "Todo updated successfully",
    data: todos_db[index],
  });
});
router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const index = todos_db.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  } 
  todos_db = todos_db.filter((todo)=>todo.id!=id);
    console.log(todos_db);
    return res.status(200).json({
        message:"Todo Deleted"
    });
});

    export default router;