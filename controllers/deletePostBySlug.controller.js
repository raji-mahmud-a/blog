import queries from "../db/queries.db.js"
import checkSlug from "../utils/checkSlug.util.js"

const deletePostBySlug = async(req, res)=>{
 const slug = req.params.slug
 const post = await checkSlug(slug)
  if(!post){
   return res.status(404).json({
   success: false,
   data: null,
   error: `The required post was not found`
  })
 }

 await queries.deletePost(slug)

 res.status(200).json({
  success: true,
  data: `The post has been succesfully deleted`,
  error: null
 })
}

export default deletePostBySlug
