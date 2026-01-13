import { loadEnvFile } from "node:process"
loadEnvFile()

import { Pool } from "pg"

const connString = process.env.PG_CONNECTION_STRING
if(!connString){
	console.error("DATABASE CONNECTION STRING NOT FOUND", connString)
	process.exit(1)
}
const pool = new Pool({
	connectionString: connString,
	ssl:{ rejectUnauthorized: false },
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTiumeoutMillis: 2000
})

export const query = (querystring, params) => pool.query(querystring, params)

export const init = async function(){
   const tableQuery =
    `
	  CREATE TABLE IF NOT EXISTS posts(
	  id SERIAL PRIMARY KEY
      featuredImage VARCHAR(255)
	  title VARCHAR(50) NOT NULL
      content TEXT NOT NULL
      excerpt VARCHAR(255)
      slug VARCHAR(255) NOT NULL UNIQUE
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      status TEXT CHECK(status IN ('draft', 'published')) DEFAULT "draft"
      viewCount INT DEFAULT 0
     );
    `

    try{
    	await query(tableQuery)
    	console.log("Database initialized succesfully")
    }catch(error){
    	console.error("error creating Tables in Database", error)
    	process.exit(1)
    }
  }

export const shutdown = async function(){
  console.log("server shutting down gracefully:::: \n      Closing database pool")
  await pool.end()
  console.log("pool succesfully closed")    
  process.exit(0)
}
