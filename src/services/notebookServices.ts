import { notes } from "../data";;
import { Note } from "../types/interfaces"
import { formateDates } from "../utils/formatDates";
import { dbConnectService } from "./dbConnectServices";
import sql from 'mssql'


function generateRandomID() {
  const min = 10000000; 
  const max = 99999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getNotes(){
      return notes;
    }

    export function getSingleNote(id: number){
      let note = notes.find((note)=>note.id===id)
      if(note)return note;
      return null
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
         let results = await  connectionPool?.request()
                                             .query(query)
         console.log(results)
        }
      })      

    }

    export function deleteNote(id: number){
      let indexofNote = notes.findIndex((note)=>note.id === id)

      if(indexofNote<0){
        return null
      }else{
        notes.splice(indexofNote, 1)
        return indexofNote
      }
    }


    export function updateNote(id:number, body:Note){
      let indexofNote = notes.findIndex((note)=>note.id===id)

      if(indexofNote>=0){
        notes[indexofNote] = body;
        let success = true
        return success
      }else{
        return false
      }
    }