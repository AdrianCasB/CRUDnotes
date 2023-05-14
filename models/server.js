import express from 'express'
import cors from 'cors'
import { router } from "../routes/usuarios.routes.js"
import { dbConnection } from '../db/config.js';

export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        //conectar a base de datos
        this.conectarDB();
        
        //middlewares
        this.middlewares();
        
        //rutas
        this.routes();
        
    }


    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        //cors
        this.app.use(cors());
        //directorio publico
        this.app.use(express.static('public'));
        //parseo del body
        this.app.use(express.json())
    }

    routes() {
        this.app.use('/api/notes', router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        })
    }
}


