import server from './services/server'
import { initMongoDB } from './db/database';

const PORT = process.env.PORT || 8080

const init = async () => {
    await initMongoDB();
    server.listen(PORT)
}

init()

