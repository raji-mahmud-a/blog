import { loadEnvFile } from "node:process";
loadEnvFile();

import { Pool } from "pg";

const connString = process.env.PG_CONNECTION_STRING;
if(!connString){
 console.error("DATABASE CONNECTION STRING NOT FOUND", connString);
 process.exit(1);
}
export const pool = new Pool({
 connectionString: connString,
 ssl:{ rejectUnauthorized: false },
 max: 20,
 idleTimeoutMillis: 30000,
 connectionTiumeoutMillis: 2000
});

export const query = (querystring, params) => pool.query(querystring, params);

export const init = async function(){
 const tableQuery =
    `
	  CREATE TABLE IF NOT EXISTS posts(
	  id SERIAL PRIMARY KEY,
      featured_image VARCHAR(255),
	  title VARCHAR(50) NOT NULL,
      content TEXT NOT NULL,
      excerpt VARCHAR(255),
      slug VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status TEXT CHECK(status IN ('draft', 'published')) DEFAULT 'draft',
      view_count INT DEFAULT 0
     );

     CREATE TABLE IF NOT EXISTS comments(
     	id SERIAL PRIMARY KEY,
     	content VARCHAR(1024) NOT NULL,
     	parent_post VARCHAR(255) NOT NULL UNIQUE,
     	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     	view_count INT DEFAULT 0,
     	FOREIGN KEY (parent_post)
     		REFERENCES posts(slug)
     		ON DELETE CASCADE
     );

     CREATE TABLE IF NOT EXISTS tags(
     	id SERIAL PRIMARY KEY,
     	name VARCHAR(50) UNIQUE NOT NULL
     );

     CREATE TABLE IF NOT EXISTS post_tags(
     	post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
     	tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
     	PRIMARY KEY (post_id, tag_id)
     );
    `;

 try{
    	await query(tableQuery);
    	console.log("Database initialized succesfully");
 }catch(error){
    	console.error("error creating Tables in Database", error);
    	process.exit(1);
 }
};

export const shutdown = async function(){
 console.log("server shutting down gracefully:::: \n      Closing database pool");
 await pool.end();
 console.log("pool succesfully closed");    
 process.exit(0);
};
