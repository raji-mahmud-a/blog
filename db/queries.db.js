import { query } from "./database.config.js";

const queries = {
 checkSlug: async function(slug){
 	const res = await query("SELECT EXISTS(SELECT 1 FROM posts WHERE slug = $1)", [slug]);
 	return res.rows[0].exists;
 },
 checkComment: async function(id){
	 const res = await query("SELECT EXISTS(SELECT 1 FROM comments WHERE id = $1)", [id]);
	 return res.rows[0].exists;
 },
 incrementViews: async function(slug){
  const res = await query("UPDATE posts SET view_count = view_count + 1 WHERE slug = $1", [slug]);
 },
 getPostBySlug: async function(slug){
  const res = await query("SELECT * from posts WHERE slug = $1 LIMIT 1", [slug]);
  return res.rows;
 },
 deletePost: async function(slug){
 	const res = await query("DELETE FROM posts WHERE slug = $1", [slug]);
 	return res;
 },
 deleteCommentByID: async function(id){
  const res = await query("DELETE FROM posts WHERE slug = $1", [slug]);
  return res;
 },
 addNewPost: async function(client, title, content, featuredImage, slug, excerpt, status){
 	const res = await client.query("INSERT INTO posts (title, content, featured_image, slug, excerpt, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [title, content, featuredImage, slug, excerpt, status]);
 	return res.rows[0];
 },
 addNewComment: async function(content, slug){
 	const res = await query("INSERT INTO comments (content, slug) VALUES ($1, $2) RETURNING *", [content, slug]);
 	return res.rows[0];
 },
 getAllPosts: async function(){
 	const res = await query("SELECT title, slug, excerpt, featured_image, view_count, created_at FROM posts WHERE status = $1 ORDER BY created_at DESC", ["published"]);
 	return res.rows;
 },
 incrementCommentViewCount: async function(slug){
 	res = await query("UPDATE comments SET view_count = view_count + 1 WHERE parent_post = $1", [slug]);	
 },
 getCommentsBySlug: async function(slug){
 	const res = await query("SELECT id, content, created_at, view_count FROM comments WHERE slug = $1", [slug]);
 	return await res.rows;
 },
 checkTag: async function(tagName, client){
 	const res = await client.query("SELECT id FROM tags WHERE name = $1", [tagName])
 	return await res.rows[0]
 },
 newTag: async function(tagName, client){
 	const res = await client.query("insert id INTO tags (name) VALUES ($1) RETURNING id", [tagName])
 	return await res.rows[0]
 },
 linkTagAndPost: async function(tagName, client){
 	const res = await client.query("INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)", [postID, tagID])
 },
};

export default queries; 
