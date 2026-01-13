import sqliteDB from "better-sqlite3"
import path from 'path';
import process from 'process';

class Database {
 static instance
 constructor() {
  if(Database.instance)return Database.instance

  try {
   this.db = new sqliteDB(process.cwd() + "/env/app.db")
   // **** SETUP DB PRAGMAs **** //
    this.db.pragma('foreign_keys = ON');
    this.db.pragma('journal_mode = WAL');
    this.db.pragma('busy_timeout = 5000');
    this.db.pragma('synchronous = NORMAL');
   // create necessary tables
   this.createTables()

   Database.instance = this
   console.log("Database succesfully created \nPragmas succesfully running \nTables succesfully initialized and schemas succesfully set")
  }catch(error){
   console.error("Error creating Database", error)
   process.exit(1)
  }
 }

 createTables(){
   const tables =
/*
  something is wrong somewhere here so pls

       FIX
*/
    `
     
CREATE TABLE IF NOT EXISTS posts(
      content VARCHAR(32768)
      featuredImage VARCHAR(255)
      slug VARCHAR(255) NOT NULL UNIQUE
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      status ENUM("draft", "published") DEFAULT "draft"
      viewCount INT DEFAULT 0
     );
    `

    this.db.prepare(tables).run()
  }

   shutdown(){
    if(this.db) this.db.close()
    console.log("server shutting down gracefully:::: \n Database closed")
    process.exit(0)
  }
}


export default Database
