'use strict'

const jwt = require('jsonwebtoken');

let Sessions = require('../models/sessions');

const middlewares = {
    userProtectUrl: function(req, res, next){
        const token = req.headers['access-token'];

        if(token){
            jwt.verify(token, 'E8djZUNvQ&GL@%88aGQ905apP0WxFWq6EFD9k%dDkTamsZyqPM', (err, decoded) =>{
                if(err){
                    return res.status(403).json({message: "Token invalidad"});
                }else{
                    req.decoded = decoded;
                    Sessions.findOne({user_id: req.decoded.user_id, jwt: token}).exec((err, session)=>{
                        if(err) return req.status(500).send({message: "Error al devolverlos datos."});
                        if(!session) return res.status(404).send({message: "Los datos de autenticacion no son validos"})
                    });
                    
                }
            });
        }else{
            res.status(403).send({
                message: "Token no valida."
            });
        }
    }
}
module.exports = middlewares;