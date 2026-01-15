import * as z from "zod";

const CommentSchema = z.object({
 content: z.string().min(1).max(1024),
});

export const validateNewComment = (req, res, next) => {
 CommentSchema.parse(req.body);
 next();
};

const SlugSchema = z.object({slug: z.string().min(5)});
const IDSchema = z.object({id: z.coerce.number().min(1).positive()});

export const validateCommentsByID =(req, res, next)=>{
 IDSchema.parse(req.params);
 next();
};

export const validatePostsBySlugEndpoint =(req, res, next)=>{
 SlugSchema.parse(req.params);
 next();
};

const postBody = z.object({
 title: z.string().min(5).max(200),
 content: z.string().min(50).max(1000),
 excerpt: z.string().max(200).optional(),
 status: z.enum(["published", "draft"]).default("draft").catch("draft")
});

export const validatePostBodyEndpoint =(req, res, next)=>{
 if(!req.file){
 	return res.status(400).json({
 		"success": false,
 		"data": null,
 		"error": "No File Added:: An image is required to make a post"
 	});
 }
 postBody.parse(req.body);
 next();
};
