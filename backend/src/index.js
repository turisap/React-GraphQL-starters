require('dotenv').config({path : '.env'});
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const createServer = require('./createServer');
const DB = require('./db');

const server = createServer();


/**
 *  Use express middleware to handle cookies (JWT)
 */
server.express.use(cookieParser());



/**
 * Use express middleware to populate each request with current user's id
 */
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        // decode user id from jwt token and place it in each request
        // you can put any necessary values to jwt tokens and subsequently in all requests
        req.userId = jwt.verify(token, process.env.APP_SECRET).userId;
    }
    next();
});


/**
 * Use express middleware to populate each request with current user's object
 */
server.express.use(async (req, res, next) => {
    if (!req.userId) return next();
    const user = await DB.query.user({ where : { id : req.userId }}, '{id, permissions, email, name}');
    req.user = user;
    next();
});



server.start({
    cors : {
        credentials : true,
        origin : process.env.FRONTEND_URL
    }
}, deets => {
    console.log(`Server is now running on port http://localhost${deets.port}`)
});