import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const connectionString = process.env.MONGO_ATLAS_URL;

export const initMongoDB = async () => {
    try {
        console.log('Conectando ...')
        await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conectado al Servidor')
    } catch (error) {
        console.log(`ERROR => ${error}`)
        return error;
    }
};

export const exitMongo = async () => {
    try {
        console.log('Desconectando ...');
        await mongoose.disconnect()
        console.log('Desconectado del Servidor')
    } catch (error) {
        console.log(`ERROR => ${error}`)
        return error;
    }
}