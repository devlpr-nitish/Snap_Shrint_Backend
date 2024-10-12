
import { Router } from "express";
import SnapController from "./snaps.controllers.js";
import { upload } from "../../middlewares/multer.middleware.js";

const snapRouter = Router();

const snapController = new SnapController();
const routeHandler = (method) => (req, res, next) => method(req, res, next);

snapRouter.post('/ai', routeHandler(snapController.getAiImage));
snapRouter.post('/save', routeHandler(snapController.saveSnap));
snapRouter.get('/', routeHandler(snapController.getSnaps));
snapRouter.post('/create-snap', upload.single('imageUrl'), routeHandler(snapController.createPost));
snapRouter.delete('/:id', routeHandler(snapController.deleteSnaps));
snapRouter.get('/posts', routeHandler(snapController.getPosts));
snapRouter.delete('/posts/:id', routeHandler(snapController.deletePosts));



export default snapRouter;