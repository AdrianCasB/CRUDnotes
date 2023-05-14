import { Note } from '../models/notes.js';


export const noteIDexist = async (id = '')=> {
    const idExiste = await Note.findById(id);
    if (!idExiste) {
        throw new Error('El id no existe en la base de datos');
    }
}




