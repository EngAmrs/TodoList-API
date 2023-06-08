const express = require('express');
const usersRoutes = require('./users');
const todosRoutes = require('./todos');
const login  = require('../middlewares/login')
const router = express.Router();



router.use('/login', login);
router.use('/users', usersRoutes);
router.use('/todos', todosRoutes);


module.exports = router;