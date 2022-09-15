const jwt = require("jsonwebtoken");
const SECRET = "BrunoGodinho"

const createTokens = (user) => {
    const token = jwt.sign(
        { userId: user[0].id, cidade: user[0].cidade},
        SECRET,
        {expiresIn: 300}
    );
    return token
};

const ValidateToken = (req, res, next) =>{
    const token = req.headers["authorization"]
    if(!token) { return res.status(400).json({error: "User not Authenticated! "})}

    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) return res.status(401).end();

        req.userId = decoded.userId
        req.cidade = decoded.cidade
        next();
    }) 
}

module.exports = {createTokens, ValidateToken}