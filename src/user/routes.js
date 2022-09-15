const { Router } = require('express');
const controller = require('./controller')
const {ValidateToken} = require('../middleware/jwt.js')
const router = Router();

// basic CRUD
router.get('/', controller.getUsers);
router.post('/', controller.addUser);
router.get('/:id', controller.getUserById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

// login Logic
router.post('/auth', controller.authUser)
router.get('/auth/login', ValidateToken, controller.loginUser)

module.exports = router;