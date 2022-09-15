const getUsers =            "SELECT * FROM usuarios ORDER BY id ASC";
const getUserById =         "SELECT * FROM usuarios WHERE id = $1";
const checkEmailExists =    "SELECT u FROM usuarios u WHERE u.email = $1";
const addUser =             "INSERT INTO usuarios (nome, email, senha, cidade) VALUES ($1, $2, $3, $4)";
const deleteUser =          "DELETE FROM usuarios WHERE id = $1";
const updateUser =          "UPDATE usuarios SET nome = $1 WHERE id = $2";
const authUser =            "SELECT id, nome, email, cidade FROM usuarios WHERE email = $1 AND senha = $2";

module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    deleteUser,
    updateUser,
    authUser,
}