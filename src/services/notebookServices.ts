import { ConnectionPool } from "mssql";
import { notes } from "../data";;
import { Note } from "../types/interfaces"
import { formateDates } from "../utils/formatDates";
import { generateRandomID } from "../utils/generateRandomID";
import { dbConnectService } from "./dbConnectServices";




    export async function getNotes(){
      // return notes;
     
        const connectionPool = await dbConnectService();
        let getAllQuery='SELECT * FROM notes'
        if (connectionPool) {
          try {
            const request = connectionPool.request();
            const result = await request.query(getAllQuery);
            console.log(result);
            
            return result.recordset;
          } catch (error) {
            console.error(error);
            return [];
          }
        }
        return [];
      }
       
 

    export async function getSingleNote(id: number){
      let note = notes.find((note)=>note.id===id)
      const connectionPool=await dbConnectService();
      if(connectionPool){
        try{
          const request=connectionPool.request();
          const result=await request.query(`SELECT * FROM notes WHERE note_id='${id}'`);
          if(result.recordset.length>0){
            return result.recordset[0];
          }
        }catch(error){
          console.error(error)
          return null
        }
      }
      // if(note)return note;
      return null;
    }

  

    export async function addNote(note: Note){
      notes.push(note)
      const noteId = generateRandomID();
      console.log(noteId) 
      let new_noteID = noteId.toString();
      let id=parseInt(new_noteID)
      let { title, content } = note;

      const createdAt = formateDates()
      
      let connectionPool = await dbConnectService();
      let query = `INSERT INTO notes (note_id, note_title, content, createdAt) VALUES ('${id}', '${title}', '${content}', '${createdAt}')`;

      connectionPool?.connect(async(err)=>{
        if(err){
          console.log(err)
        }else{
         let results = await  connectionPool?.request().query(query)
         console.log(results)
        }
      })      

    }

    export async function deleteNote(id: number){
      let indexofNote = notes.findIndex((note)=>note.id === id)

      if(indexofNote<0){
        return null
      }else{
        notes.splice(indexofNote, 1)
        const connectionPool=await dbConnectService();
        if(connectionPool){
          try{
            const request=connectionPool.request();
            await request.query(`DELETE FROM notes WHERE note_id='${id}`);
          }catch(error){
            console.error(error);
            return false;
            
          }
        }
        return indexofNote
      }
    }


    export async function updateNote(id:number, updatedNote:Note){
      let indexofNote = notes.findIndex((note)=>note.id===id)

      if(indexofNote>=0){
        notes[indexofNote] = updatedNote;
        const { title, content } = updatedNote;
        const ConnectionPool= await dbConnectService();
        if (ConnectionPool){
          try{
            const request=ConnectionPool.request();
            await request.query(
              `UPDATE notes SET note_title='${title}', content='${content}',WHERE note_id='${id}'`
            );
            return true;
          }catch(error){
            console.error(error);
            return false;
          }
        }
        let success = true
        return success
      }else{
        return false
      }
    }

   