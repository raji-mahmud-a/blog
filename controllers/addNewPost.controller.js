import createSlug from "../utils/createSlug.util.js";
import queries from "../db/queries.db.js";
import { pool } from "../db/database.config.js"

const addNewPost = async(req, res)=>{
 const { title, content, excerpt, status, tags } = req.body;
 const FeaturedImage = `${process.env.LIVE_URL}/static/uploads/${req.file.filename}`;
 const Slug = createSlug(title);
 const Excerpt = (excerpt) ? excerpt : content.substring(0, 200) + "...";
 const Status = (status === "published") ? status : "draft";

 const checkSlug = await queries.checkSlug(Slug);
 if(checkSlug){
 	return res.status(404).json({
 		"success": false,
 		"error": "A post with the same title has been created before",
 		"data": null
 	});
 }
 const client = pool.connect()

 try{
 client.query("BEGIN")
 
 const post = await queries.addNewPost(client, title, content, FeaturedImage, Slug, Excerpt, Status);
 for(let tagName of tags){
 	let tag = await queries.checkTag(client, tagName)
 	if(!tag){
 		tag = await queries.newTag(client, tagName)
 	}
 	await queries.linkTagAndPost(client, post.id, tag.id)

 	await client.query("COMMIT")
 }
}catch(e){
	await client.query("ROLLBACK")
	res.status(500).json({
		success: false,
		error: "An error occured when creating post",
		data: null
	})
}finally{
	client.release()
}
 res.status(201).json({
  "success": true,
  "message": "Post created successfully",
  "data": null
 });
};

export default addNewPost;
