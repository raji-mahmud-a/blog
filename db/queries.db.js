import { query } from "./database.config.js"

const queries = {
 checkSlug: async function(slug){
 	return await query("SELECT EXISTS(SELECT 1 FROM posts WHERE slug = $1)", [slug]).rows[0].slug
 },
 incrementViews: async function(slug){
  return await query("UPDATE posts SET viewCount = viewCount + 1 WHERE slug = $1", [slug])	
 },
 getPostBySlug: async function(slug){
  return await query("SELECT * from posts WHERE slug = $1 LIMIT 1", [slug]).rows[0]
 },
 deletePost: async function(slug){
 	return await query("DELETE FROM posts WHERE slug = $1", [slug])
 },
 addNewPost: async function(title, content, featuredImage, slug, excerpt, status){
 	return await query("INSERT INTO posts (title, content, featuredImage, slug, excerpt, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [title, content, featuredImage, slug, excerpt, status]).rows[0]
 }
}

export default queries 
