import { Router } from 'express';
import { addNoteController,getNotesController,getSingleNoteController,updateNoteController,deleteNoteController, getOneNote, } from '../controllers/notebookControllers';

const noteRouter:Router=Router();

noteRouter.post('/',addNoteController)
noteRouter.get('/notes',getNotesController)
noteRouter.get('/:userID',getOneNote)
noteRouter.put('/:userID',updateNoteController)
noteRouter.delete('/:userID',deleteNoteController)

export default noteRouter;