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
    export default router;