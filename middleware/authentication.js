const jwt = require("jsonwebtoken");

const authentication =async (req,res,next)=>{
    const token = req.headers.authorization
    try {
        console.log(token);

        if(!token) return res.send("You have to login first")

        const {email,_id} = await jwt.verify(token,"ALPHA")
        console.log(email)
        req.body.email = email;
        req.body.userId = _id
        next()
    } catch (error) {
        console.log(error)
        res.send({error:error.message})
    }
}


module.exports = {authentication}