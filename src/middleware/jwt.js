const {sign, verify} = require("jsonwebtoken");

const createTokens = (user) => {
    const token = sign(
        { email: user.email, senha: user.senha},
        "SecretPlsChange"
    );
    return token
};

const ValidateToken = (req, res, next) =>{
    const token = req.headers["access-token"]

    if(!token) { return res.status(400).json({error: "User not Authenticated! "})}

    try{
        const validToken = verify(token, "SecretPlsChange")
            if (validToken){
                req.authenticated = true
                return next()
            }
    }
    catch (err){
        return res.status(400).json({error: err})
    }
}

module.exports = {createTokens, ValidateToken}