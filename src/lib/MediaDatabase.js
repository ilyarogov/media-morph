import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync, readFileSync} from 'fs';

export default class MediaDatabase
{
    conn;
    __filename;
    __dirnamel
    dbdir;
    db;

    constructor(SQLite3)
    {
        this.conn = SQLite3;
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        this.dbdir = `${__dirname}/../db/`;
    }

    createDatabase()
    {
        if(!existsSync(this.dbdir+'media_import.db')){
            const createTablesSql = readFileSync(this.dbdir+"media_db.sql", {encoding:'utf8', flag:'r'});

            this.db = new this.conn.Database(this.dbdir+'media_import.db', this.conn.OPEN_READWRITE | this.conn.OPEN_CREATE, (err) => {
                if (err) {
                    console.log("Getting error " + err);
                }else{
                    this.db.exec(createTablesSql);
                }
            });
        }
    }

    async insertRecords(json)
    {
        this.db = new this.conn.Database(this.dbdir+'media_import.db', this.conn.OPEN_READWRITE, (err)=>{if(err){console.log}});
        let tracks = json.tracks;

        tracks.forEach(async (row, idx)=>{
            let artistId = await this.getArtist(row.artist);
            await this.insertInstance(artistId, row);
        });
    }

    async getArtist(artistName)
    {
        return new Promise((resolve, reject) => {
            let getArtistSql = 'SELECT id FROM artists WHERE artist_name = ?';
            this.db.get(getArtistSql, artistName, (err, data) => {
                if(err){
                    reject(err);
                }else{
                    if(!data){
                        resolve(this.insertArtist(artistName));
                    }else{
                        resolve(data.id);
                    }
                }
            });
        });
    }

    async insertArtist(artistName)
    {
        return new Promise((resolve, reject) => {
            let insertArtistSql = 'INSERT INTO artists (artist_name) VALUES (?)';
            this.db.run(insertArtistSql, artistName, function(err){
                if(err){
                    reject(err);
                }else{
                    resolve(this.lastID);
                }
            })
        });
    }

    async insertInstance(artistId, mediaRow)
    {
        return new Promise((resolve, reject) => {
            let insertInstanceSql = 'INSERT INTO media_instances (type_id, artist_id, name, source, uri) VALUES (?,?,?,?,?)';
            this.db.run(insertInstanceSql, [1, artistId, mediaRow.track, 'spotify', mediaRow.uri], function(err){
                if(err){
                    reject(err);
                }else{
                    resolve('ok');
                }
            })
        });
    }

    async getLibrary()
    {
        this.db = new this.conn.Database(this.dbdir+'media_import.db', this.conn.OPEN_READWRITE, (err)=>{if(err){console.log}});

        return new Promise((resolve, reject) => {
            let getLibraryql = 'SELECT * FROM media_instances';
            this.db.all(getLibraryql, (err, data) => {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
}