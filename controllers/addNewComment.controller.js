import createSlug from "../utils/createSlug.util.js";
import queries from "../db/queries.db.js";

const addNewComment = async(req, res)=>{
 const content = req.body.content;
 const slug = req.params.slug;
 const Slug = createSlug(title);

 const checkSlug = await queries.checkSlug(Slug);

 if(!checkSlug){
 	return res.status(404).json({
 		"success": false,
 		"error": "The post which you are trying to comment under does not exist",
 		"data": null
 	});
 }
 
 await queries.addNewComment(content, slug);

 res.status(201).json({
  "success": true,
  "message": "Comment created successfully",
  "data": null
 });
};

export default addNewComment;
