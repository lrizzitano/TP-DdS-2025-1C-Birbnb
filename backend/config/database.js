import mongoose from "mongoose";

export class MongoDBClient {
    static async connect() {
        try {
            const conn = await mongoose.connect(process.env.MONGODB_URI ? process.env.MONGODB_URI + "/" + process.env.MONGODB_DB_NAME : 'mongodb://localhost:27017/birbnb');
            console.log(`Conectado a MongoDB: ${conn.connection.host}`);
        } catch (error) {
            console.error(`Error al conectar a MongoDB: ${error.message}`);
            process.exit(1);
        }
    }
}