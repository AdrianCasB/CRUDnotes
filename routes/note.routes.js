import { Router } from 'express';
import { check } from 'express-validator';
import { notesDelete, notesGet, notesPatch, notesPost, notesPut } from '../controllers/notes.controller.js';
import { noteIDexist } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';

export const router = Router();


router.get('/', notesGet);

router.put('/:id',[
    check('id','No es un id  valido').isMongoId(),
    check('description','No puede estar vacío').not().isEmpty(),
    check('id').custom(noteIDexist),
    validarCampos
], notesPut);

router.post('/', [
    check('description', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], notesPost);

router.delete('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(noteIDexist),
    validarCampos
], notesDelete);

router.patch('/', notesPatch);


