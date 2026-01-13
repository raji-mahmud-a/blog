import queries from "../db/queries.db.js"

const checkSlug= async (slug)=>{
 return await queries.checkSlug(slug)
}

export default checkSlug
