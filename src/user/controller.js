const pool = require('../../db')
const queries = require('./queries')
const {createTokens, validateToken} = require('../middleware/jwt.js')


const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows)
    });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUserById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows)
    });
};

const addUser = (req, res) => {
    const { nome, email, senha, cidade} = req.body;

    pool.query(queries.checkEmailExists, [email], (error, results) =>{
        if(results.rows.length){
            res.status(401).json({message: "Email already exists! "}); 
        }
        else{
            pool.query(queries.addUser, [nome, email, senha, cidade], (error, results) =>{
                if(error) throw error;
                res.status(201).json({message: "User created successfully! "})
            });
        }
    });
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUserById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound) {
            res.status(401).json({message: "User does not exist! "}); 
        } 
        else{
            pool.query(queries.deleteUser, [id], (error, results) => {
                if (error) throw error;
                res.status(200).json({message: "User removed successfully! "})
            })
        }
    });
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;

    pool.query(queries.getUserById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound) {
            res.status(401).json({message:"User does not exist! "}); 
        }
        else{
            pool.query(queries.updateUser, [nome, id], (error, results) => {
                if(error) throw error;
                res.status(200).json({message: "User updated successfully! "});
            })
        }
    })
};

const authUser =  (req, res) => {

    const {  email, senha } = req.body;

    pool.query(queries.authUser, [email, senha], (error, results) =>{
        if(!results.rows.length){
           res.status(400).json({message: "User not authenticated "});
        }
        else{
            const user = results.rows;
            const token = createTokens(user);

            res.cookie("access-token", token, {
                maxAge: 600000,
                httpOnly: true,
            })
        
            res.status(200).json({  "AccessToken": token,
                                    "userId":  results.rows[0].id,
                                    "cidade": results.rows[0].cidade}) 
            //return res.redirect("/login") 
        }
    });
};

const loginUser = (req, res) => {
    
    res.status(200).json({ message: "Login"})
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    authUser,
    loginUser,
}