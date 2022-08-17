import sqlite3 from "sqlite3";
import MediaDatabase from "$lib/MediaDatabase";

export async function GET({request})
{
  const SQLite3 = sqlite3.verbose();
  try{
    let mediaDb = new MediaDatabase(SQLite3);
    let dbExists = mediaDb.checkDbExists();
    let library = [];
    if(dbExists){
      library = await mediaDb.getLibrary();
    }
    return {
      status: 200,
      body: JSON.stringify(library)
    }; 
  }catch(err) {
    console.log(err);
    return {
      status: 500,
      body: 'error'
    };    
  }
}