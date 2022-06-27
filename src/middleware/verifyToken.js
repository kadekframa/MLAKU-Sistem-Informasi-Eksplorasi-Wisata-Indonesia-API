const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (req, res, next) => {
    try {
        const cookie = req.cookies['jwt'];
        const tokens = jwt.verify(cookie, process.env.PRIVATE_TOKEN);

        if (!tokens) {
            return res.status(401).send({
                message: 'token anda tidak valid.'
            });
        }
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'Anda tidak memiliki token.',
        });
    }
}

module.exports = verifyToken;