const server = require('./services/server')
const { initMongoDB } = require('./db/database');

const PORT = process.env.PORT || 8080

const init = async () => {
    await initMongoDB();
    server.listen(PORT)
}

init()

