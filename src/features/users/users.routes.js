import { Router } from "express";
import UserController from "./users.controller.js";
import signupValidation from "../../middlewares/signup.validation.js";
import signinValidation from "../../middlewares/signin.validation.js";
import { upload } from "../../middlewares/multer.middleware.js";
import editValidation from "../../middlewares/editProfile.validation.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";


const userRouter = Router();
const userContoller = new UserController();


userRouter.post('/signup',upload.single('profileImage'), signupValidation, (req, res, next) => {
    userContoller.signup(req, res, next);
})
userRouter.post('/signin', signinValidation, (req, res, next) => {
    userContoller.signin(req, res, next);
})
userRouter.post('/edit', jwtAuth, upload.single('profileImage'), editValidation, (req, res, next) => {
    userContoller.editProfile(req, res, next);
})


export default userRouter;

