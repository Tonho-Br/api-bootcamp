//registro de usuario
const {User} = require('../models/index')


//registro de usuarios

exports.createUser = async (req, res) =>{


    try{

     const {firstName, lastName, email} = req.body

        if(!firstName || email){
            return res.json({"error": "firstName or email invalid our null - please try again"})
        }
    
        const emailValidation = await User.findOne({where: {email}})
    
        if(emailValidation){ // assumese true
            return res.json({"error": "user exist"})
        } 
    
        const usuarioAdicionado = await User.create(req.body)
    
        return res.json(usuarioAdicionado)

    }catch(error){
        res.send({
            error: 'Error',
            message: error.message
        })
    }
}

//listagem de todos os usuarios
exports.listaAllUsers = async (req, res) => {
    const listadeusuarios = await User.findAll();

    //faça uma validação de lista de usuarios para quando ele nao existir
    if(!listadeusuarios){
        return res.status(404).json({"error": "Nothing to show"})
    }
    //ai sim^

    return res.json(listadeusuarios)
}


//listagem de 1 usuario por id 
exports.userDetails = async (req,res) => {
    const id = req.params.id;

    const details = await User.findOne({where: {id}})

    if(!details){
        return res.json({"msm": "User not found"})
    }

    return res.json(details)
}

//Deletar usuario pelo id

exports.deleteUser = async (req,res) => {
    const id = req.params.id;

    const userDeleted = await User.destroy({where: {id}})

    

    return res.json({"msg": "user deleted"})
}

exports.updatePutUser = async(req,res) =>{
    const id = req.params.id;

    const dataToUpdate = req.body;

    //criar validação de usuario n encontrado

    const findUser = await User.findOne({where: {id}})

    if(!findUser){
        return res.status(404).json({msg: "User not found"})
    }

    const resultaToUpdate = await User.update(
        //os valores que serão alterados
        dataToUpdate, 

        //a condição para validar a alteração
        {where: {id}}
    )
    return res.json({msg: 'user updated'})
}
/*
exports.updatePutUser = async(req,res) =>{
    const id = req.params.id;

    const dataToUpdate = req.body;
    const resultaToUpdate = await User.update(
        //os valores que serão alterados
        dataToUpdate, 

        //a condição para validar a alteração
        {where: {id}}
    )
    return res.json({msg: 'user updated'})
}
*/
