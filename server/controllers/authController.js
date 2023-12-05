const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");

exports.login=(req,res)=>{
    //ข้อมูลคนที่เข้าสู๋ระบบ
    const {username, password} = req.body
    if(password === process.env.PASSWORD){
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn: '1d'})
        return res.json({username, token})
    }else{
        return res.status(400).json({error: "รหัสผ่านไม่ถูกต้อง !"})
    }
}

//ครวจสอบ Token
exports.requireLogin = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
})