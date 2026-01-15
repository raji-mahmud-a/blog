import { Router } from "express";
import getAllComments from "../controllers/getAllComments.controller.js";
import deleteCommentByID from "../controllers/deleteCommentByID.controller.js";
import { validateCommentsByID } from "../middlewares/validators.middleware.js";
import addNewComment from "../controllers/addNewComment.controller.js";

const commentRoutes = Router();

commentRoutes.route("/").get(getAllComments).post(addNewComment);
commentRoutes.route("/:id").all(validateCommentsByID).get(deleteCommentByID);

export default commentRoutes;
