module.exports = app =>{
    const router = require ('express').Router();

    const AppController = require('../controllers/app.controller')
    const UserController = require('../controllers/user.controller')

    router.get('/', AppController.hello)
    router.get('/users', UserController.listaAllUsers)
    router.post('/users', UserController.createUser)
    router.get('/users/:id', UserController.userDetails)
    router.delete('/user/:id', UserController.deleteUser)
    router.patch('/users/:id', UserController.updatePutUser)

    app.use('/api', router)
}