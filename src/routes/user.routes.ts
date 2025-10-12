import * as express from 'express';
import { userController } from '../controllers/user.controller';
import { userValaditor } from '../middleware/user.validator';
const Router = express.Router();


// Router.get("/users" , (req:Request , res:Response)=>{
//     res.send("List Of Users")
// })


// Router.post("/users" , (req:Request , res:Response)=>{
//     res.send("User Created");
// })

Router.get("/users" , userController.getAllUsers);
Router.post("/users" , userValaditor , userController.createUser)
Router.put("/users/:id", userValaditor ,userController.updateUser);

export {Router as userRouter}