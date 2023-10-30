import { Response, Request } from "express"
import { addNote,
        getNotes, 
         getSingleNote,  
         updateNote,deleteNote, } from "../services/notebookServices";
import { new_query } from "../services/dbconnect";




export function addNoteController(req: Request, res:Response){
    let new_note = req.body;

    addNote(new_note);
    res.json({
          id: new_note.id,
          title: new_note.title,
          sucess: true
    })
}

export async function getNotesController(req: Request, res:Response){
      
      // let notes = await getNotes();

      // console.log(notes);
      const queryString = "select * from notes"

      const result = await new_query(queryString)

      res.json( result.recordset)
      
      
}





export const  getOneNote=async (req:Request,res:Response)=>{
      try{

            const {userID}=req.params;
            console.log(userID);
            
            const queryString=`SELECT * FROM notes WHERE note_id='${userID}'`
            const result=await new_query(queryString)
            // console.log(result.recordset);
            

            res.json(result.recordset[0])

      }catch(err){
            console.log(err)

      }




}



export function getSingleNoteController(req:Request, res:Response ){
      let {noteID} = req.params;
      let parsedID = parseInt(noteID)
      let note = getSingleNote(parsedID);

      res.json(note)
}

export async function updateNoteController(req:Request, res:Response){
    let { noteID } = req.params;
    let parsedID = parseInt(noteID)
    let updatedNote = req.body;

    let result = updateNote(parsedID, updatedNote);
    if (await result) {
          return res.json({
                id: parsedID,
                success: true
          })
    }
    return res.json({
          success: false
    })
}

export function deleteNoteController(req:Request, res:Response){
      let {noteID} = req.params;
      let parsedID = parseInt(noteID);

      let results = deleteNote(parsedID);

      if(results !== null){
            res.send(`Note with id:${noteID} on index: ${results} deleted`);
      }else{
            res.send("Note not found")
      }
}


