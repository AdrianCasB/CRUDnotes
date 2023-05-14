import { request, response } from "express";
import { Note } from '../models/notes.js'

export const notesGet = async (req = request, res = response) => {

    // const { limit = "1", page = "1" } = req.query;
    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };

    const [total, notes] = await Promise.all([
        Note.countDocuments(query),
        Note.find(query)
            .skip(from)
            .limit(limit)
    ])

    res.status(200).json({
        ok: true,
        total,
        notes
    })
}

export const notesPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { description } = req.body;

    //TODO : VALIDAR EN DB

    
    const note = await Note.findByIdAndUpdate(id, { description });

    res.status(200).json({
        ok: true,
        msg: 'put API',
        description,
        id,
        note
    })
}

export const notesPost = async (req = request, res = response) => {

    const { description } = req.body;
    const note = new Note({ description });

    
    //Guardar nota en la base de datos
    await note.save();

    //Obtener respuesta

    res.status(201).json({
        ok: true,
        msg: 'post API',
        note
    })


}

export const notesDelete = async (req, res = response) => {

    //DE ESTA FORMA BORRARIAMOS TOTALMENTE EL USUARIO DE LA BASE DE DATOS
    // const { id } = req.params;
    // const usuario = await Usuario.findByIdAndDelete(id);

    const { id } = req.params;
    const note = await Note.findByIdAndUpdate(id, { estado: false });

    res.json({
        ok: true,
        note
    })
}


export const notesPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API'
    })
}