import {Schema,model} from 'mongoose';


const noteSchema = Schema({
    description: {
        type: String,
        required: [true, 'Escribe una nota']
    },

    estado: {
        type: Boolean,
        default: true,
    },


});

noteSchema.methods.toJSON = function(){
    const {__v, ...note} = this.toObject();
    return note;
}

export const Note = model('Note', noteSchema);

