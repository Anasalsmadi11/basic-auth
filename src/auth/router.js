const express = require('express');
const userRouter = express.Router();
const { userModel } = require('../auth/models/index');
const bcrypt= require('bcrypt')
const base64= require('base-64')

userRouter.get('/',(req,res)=>{
    res.send(`welcome home`)
})
userRouter.post('/signup',signUp)
userRouter.get('/signin', signIn)

// let text= "@anas"
// async function crypt(test){
//     let hashed= await bcrypt.hash(text,2)
//     console.log(`hashed password =>>> ${hashed}`)
// }
// crypt(text)

async function signUp(req,res){
   try{

    let username=req.body.username
    // console.log(username)

    let hashedPassword=await bcrypt.hash(req.body.password,10)

    const record= await userModel.create({
        username: username,
        password: hashedPassword
    });
    console.log(record)
    res.status(201).json(record)
}catch(error){
    // console.log(error)
    res.status(500).send(error)
}
}

async function signIn(req,res){
    console.log(req.headers.authorization)
    if(req.headers.authorization){
        let headersParts= req.headers.authorization.split(" ")
        let encodedValues= headersParts.pop()
        let decodedValues=  base64.decode(encodedValues)
        
        let[username, password]=decodedValues.split(":")
        // console.log(username)
        const user= await userModel.findOne({where:{username:username}})
        console.log(password) //this is the password i put in the auth in thc
        // console.log(`this user =>>>> ${user}`)
        let validUser= await bcrypt.compare(password,user.password) //user.password propobly is the password that inserted to the db(the hashed one)
        if(validUser){
            res.status(200).json(user)
        }else{
            res.status(500).send(`wrong username or password`)
        }
    }else{
        console.log(`no username or password`)
    }
}

module.exports= userRouter;