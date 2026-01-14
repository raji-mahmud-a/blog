import checkSlug from "../utils/checkSlug.util.js"
import queries from "../db/queries.db.js"
import incrementViewCount from "../utils/incrementViewCount.util.js"

const getPostBySlug = async (req, res)=>{
 console.log(req.body)
 const slug = req.params.slug
 const exists = await checkSlug(slug)
0
 if(!exists){
   return res.status(404).json({
   success: false,
   data: null,
   error: `The required post was not found`
  })
 }

 const post = await queries.getPostBySlug(slug)
 console.log(post)
 await incrementViewCount(slug)

 res.status(200).json({
  success: true,
  data: post,
  error: null
 })
}

export default getPostBySlug
