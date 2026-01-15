import queries from "../db/queries.db.js";
import checkSlug from "../utils/checkSlug.util.js";

const deletePostBySlug = async(req, res)=>{
 const { slug, id } = req.params;
 const post = await checkSlug(slug);
 if(!post){
  return res.status(404).json({
   success: false,
   data: null,
   error: "The required post was not found"
  });
 }

 const comment = await queries.checkComment(id);

 if(!comment){
 	return res.status(404).json({
 		success: false,
 		data: null,
 		error: "The required comment was not found"
 	});
 }
 
 const comments = await queries.deleteCommentByID(slug);
 
 res.status(200).json({
  success: true,
  data: "The comment has been succesfully deleted",
  error: null
 });
};

export default deletePostBySlug;
