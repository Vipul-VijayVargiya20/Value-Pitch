const router = require('express').Router()

const { register, updateUser, getAllUser, getUserById } = require('../controller/userController')

router.post('/register', register)
    .put('/updateUser:/userId', updateUser)
    .get('/getAllUser', getAllUser)
    .get('/getUserById:/userId', getUserById)

module.exports = router