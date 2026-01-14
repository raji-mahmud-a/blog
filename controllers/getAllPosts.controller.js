import queries from "../db/queries.db.js"

const getAllPosts = async(req, res)=>{
 const posts = await queries.getAllPosts()

 res.status(200).json({
  success: true,
  data: posts,
  error: null
 })
}

export default getAllPosts
