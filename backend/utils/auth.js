const jwt = require('jsonwebtoken');
const info = require('../config/jwt.json');

module.exports = {
    newToken : (user)=>{
        const payload={
            id: user.uuid,
            username:user.username
        }
        return jwt.sign(payload, info.SECRET_KEY, {expiresIn:info.EXPIRATION_DATE});
    },

    verifyToken : (token)=>{
        new Promise((resolve, reject)=>{
            jwt.verify(token, info.SECRET_KEY, (err, payload)=>{
                if(err) return reject(err);
                resolve(payload);
            })
        })
    },

    authUser: async(req, res, next)=>{
        if(!req.headers.authorization){
            return res.status(401).json({ message:'No Token' });
        }
        const token = req.headers.authorization;
        try {
            await this.verifyToken(token);
            next();
        } catch (error) {
            return res.status(401).json({ message : 'Invalid Token'});
        }
    }
   
}