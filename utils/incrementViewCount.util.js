import queries from "../db/queries.db.js";

const incrementViewCount =(slug)=>{
 queries.incrementViews(slug);
};

export default incrementViewCount;
