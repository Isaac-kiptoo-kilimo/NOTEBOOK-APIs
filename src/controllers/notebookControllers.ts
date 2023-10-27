import { Response, Request } from "express"
import { addNote,
        getNotes, 
         getSingleNote,  
         updateNote,deleteNote, } from "../services/notebookServices";


export function appTest(req:Request, res:Response){
      return res.send("Test okay")
}

export function addNoteController(req: Request, res:Response){
    let new_note = req.body;

    addNote(new_note);
    res.json({
          id: new_note.id,
          title: new_note.title,
          sucess: true
    })
}

export function getNotesController(req: Request, res:Response){
      let notes = getNotes();
      res.json(notes)
}


export function getSingleNoteController(req:Request, res:Response ){
      let {noteID} = req.params;
      let parsedID = parseInt(noteID)
      let note = getSingleNote(parsedID);

      res.json(note)
}

export function updateNoteController(req:Request, res:Response){
    let { noteID } = req.params;
    let parsedID = parseInt(noteID)
    let updatedNote = req.body;

    let result = updateNote(parsedID, updatedNote);
    if (result) {
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


