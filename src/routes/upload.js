import sqlite3 from "sqlite3";
import MediaDatabase from "../lib/MediaDatabase";

export async function POST({request})
{
  try {
    const SQLite3 = sqlite3.verbose();
    let json = await request.json();
    let mediaDb = new MediaDatabase(SQLite3);
    mediaDb.createDatabase();
    await mediaDb.insertRecords(json);
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      body: 'error'
    };      
  }

  return {
    status: 200,
    body: 'ok'
  };
}
