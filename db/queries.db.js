import { query } from "./database.config.js"

const queries = {
 checkSlug: async function(slug){
 	const res = await query("SELECT EXISTS(SELECT 1 FROM posts WHERE slug = $1)", [slug])
 	return res.rows[0].exists
 },
 incrementViews: async function(slug){
  const res = await query("UPDATE posts SET view_count = view_count + 1 WHERE slug = $1", [slug])
 },
 getPostBySlug: async function(slug){
  const res = await query("SELECT * from posts WHERE slug = $1 LIMIT 1", [slug])
  return res.rows
 },
 deletePost: async function(slug){
 	const res = await query("DELETE FROM posts WHERE slug = $1", [slug])
 	return res
 },
 addNewPost: async function(title, content, featuredImage, slug, excerpt, status){
 	const res = await query("INSERT INTO posts (title, content, featured_image, slug, excerpt, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [title, content, featuredImage, slug, excerpt, status])
 	return res.rows[0]
 },
 getAllPosts: async function(){
 	const res = await query("SELECT title, slug, excerpt, featured_image, view_count, created_at FROM posts WHERE status = $1 ORDER BY created_at DESC", ["published"])
 	return res.rows
 }
}

export default queries 
