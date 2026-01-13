import { query } from "../db/database.config.js"

const getAllPosts = (req, res)=>{
 const posts = query("SELECT * from posts").rows

 res.status(200).json({
  success: true,
  data: posts,
  error: null
 })
}

export default getAllPosts
