import { Router } from 'express';
import { addNoteController,getNotesController,getSingleNoteController,updateNoteController,deleteNoteController, } from '../controllers/notebookControllers';

const noteRouter:Router=Router();

noteRouter.post('/',addNoteController)
noteRouter.get('/notes',getNotesController)
noteRouter.get('/:userID',getSingleNoteController)
noteRouter.put('/:userID',updateNoteController)
noteRouter.delete('/:userID',deleteNoteController)

export default noteRouter;