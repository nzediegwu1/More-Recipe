import jwt from 'jsonwebtoken';
require('dotenv').config();

class Authenticate {
    constructor() {
        this.key = process.env.SECRET_KEY;
        // method inherits the req, res and next parameters of the router without being
        // explicitly passed upon in invocation or instantiation, dont know why
        this.Verify = (req, res, next) => {
            const token = req.body.token || req.headers['x-token'] || req.query.token;
            if (!token) {
                return res.status(401).json({ error: { message: 'Unauthorized' } });
            }
            jwt.verify(token, this.key, (error, decoded) => {
                if (error) {
                    return res.status(403).json({ error: {
                        message: 'Token could not be authenticated' } });
                }
                req.decoded = decoded;
                next();
            });
        };
    }
}
export default Authenticate;
