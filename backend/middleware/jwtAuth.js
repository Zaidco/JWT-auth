// const JWT = require('jsonwebtoken');
// const authRouter = require('../router/authRoute');

// const jwtAuth= (req,res,next) =>{
//     const token =(req.cookies && req.cookies.token) || null;

//     if(!token){
//        return res.status(400).json({
//          success: false,
//          message: "token doesnt exit/Not authorised"
//        })
//     }
    

//     try{
//       const payload = JWT.verify(token,process.env.SECRET);
//       req.user={id: payload.id, email: payload.email};
//     }catch(e){
//       return res.status(400).json({
//         success: false,
//         message: e.message
//       })
//     }
//     next();
// }

// module.exports= awtAuth;


const JWT = require('jsonwebtoken');
const authRouter = require('../router/authRoute'); // This line is unnecessary unless used here
 require('dotenv').config(); // Uncomment if needed

const jwtAuth = (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || null;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Token doesn't exist / Not authorised"
        });
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET);
        req.user = { id: payload.id, email: payload.email };
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }

    next();
};

module.exports = jwtAuth;
