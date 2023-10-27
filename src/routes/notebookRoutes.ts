import { Router } from 'express';
import { appTest,addNoteController,getNotesController,getSingleNoteController,updateNoteController,deleteNoteController, } from '../controllers/notebookControllers';

const noteRouter:Router=Router();

noteRouter.get('/', appTest);
noteRouter.post('/',addNoteController)
noteRouter.get('/me',getNotesController)
noteRouter.get('/:userID',getSingleNoteController)
noteRouter.put('/:userID',updateNoteController)
noteRouter.delete('/:userID',deleteNoteController)

export default noteRouter;