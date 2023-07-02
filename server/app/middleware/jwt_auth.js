const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies['session_token']
    if(!token) {
        res.status(400).end();
        return;
    }

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch(error) {
        return res.status(401).send('Invalid Token');
    }

    return next();
}

module.exports = verifyToken;