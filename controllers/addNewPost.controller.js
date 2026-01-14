import createSlug from "../utils/createSlug.util.js"
import queries from "../db/queries.db.js"

const addNewPost = async(req, res)=>{
 const { title, content, excerpt, status } = req.body
 const FeaturedImage = `${process.env.LIVE_URL}/static/uploads/${req.file.filename}`
 const Slug = createSlug(title)
 const Excerpt = (excerpt) ? excerpt : content.substring(0, 200) + '...'
 const Status = (status === 'published') ? status : 'draft'

 const checkSlug = await queries.checkSlug(Slug)
 if(checkSlug){
 	return res.status(404).json({
 		"success": false,
 		"error": "A post with the same title has been created before",
 		"data": null
 	})
 }
 await queries.addNewPost(title, content, FeaturedImage, Slug, Excerpt, Status)

 res.status(201).json({
  "success": true,
  "message": "Post created successfully",
  "data": null
 })
}

export default addNewPost
