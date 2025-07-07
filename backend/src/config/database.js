import mongoose from "mongoose";

export class MongoDBClient {
    static async connect() {
        try {
            // intenta conectarse con las variables de entorno (ahi metemos la conection string de Mongo Atlas), sino puede intenta con local
            const conn = await mongoose.connect(process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://localhost:27017/birbnb');
            console.log(`Conectado a MongoDB: ${conn.connection.host}`);
        } catch (error) {
            console.error(`Error al conectar a MongoDB: ${error.message}`);
            process.exit(1);
        }
    }
}