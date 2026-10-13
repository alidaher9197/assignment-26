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
    export default router;