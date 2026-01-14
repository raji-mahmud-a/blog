import * as z from "zod"

const SlugSchema = z.object({slug: z.string().min(5)})
export const validatePostsBySlugEndpoint =(req, res, next)=>{
 SlugSchema.parse(req.params)
 next()
}

const postBody = z.object({
 title: z.string().min(5).max(200),
 content: z.string().min(50).max(1000),
 excerpt: z.string().max(200).optional(),
 status: z.enum(['published', 'draft']).default('draft').catch('draft')
})

export const validatePostBodyEndpoint =(req, res, next)=>{
 if(!req.file){
 	return res.status(400).json({
 		"success": false,
 		"data": null,
 		"error": "No File Added:: An image is required to make a post"
 	})
 }
 postBody.parse(req.body)
 next()
}
