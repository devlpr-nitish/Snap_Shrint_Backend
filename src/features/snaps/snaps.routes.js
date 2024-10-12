
import { Router } from "express";
import SnapController from "./snaps.controllers.js";
import { upload } from "../../middlewares/multer.middleware.js";

const snapRouter = Router();
const snapController = new SnapController();

snapRouter.post('/ai', (req, res, next) => {
    snapController.getAiImage(req, res, next);
});

snapRouter.post('/save', (req, res, next) => {
    snapController.saveSnap(req, res, next);
});

snapRouter.get('/', (req, res, next) => {
    snapController.getSnaps(req, res, next);
});

snapRouter.post('/create-snap', upload.single('imageUrl'), (req, res, next) => {
    snapController.createPost(req, res, next);
});

snapRouter.delete('/:id', (req, res, next) => {
    snapController.deleteSnaps(req, res, next);
});

snapRouter.get('/posts', (req, res, next) => {
    snapController.getPosts(req, res, next);
});

snapRouter.delete('/posts/:id', (req, res, next) => {
    snapController.deletePosts(req, res, next);
});


export default snapRouter;