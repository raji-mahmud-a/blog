import checkSlug from "../utils/checkSlug.util.js";
import queries from "../db/queries.db.js";

const getAllComments = async (req, res)=>{
 const slug = req.params.slug;
 const exists = await checkSlug(slug);
 if(!exists){
  return res.status(404).json({
   success: false,
   data: null,
   error: "The post comment was not found"
  });
 }

 const commments = await queries.getCommentsBySlug(slug);
 await queries.incrementCommentViewCount(slug);

 if(comments.length === 0){
 	return res.status(404).json({
 		success: false,
 		data: null,
 		error: "No comments yet:: Nothing to see here"
 	});
 }

 res.status(200).json({
  success: true,
  data: comments,
  error: null
 });
};

export default getAllComments;
