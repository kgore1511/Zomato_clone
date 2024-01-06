const bcrypt=require('bcrypt')
const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')
 
async function loginUser(req,res,next) {
  try{
  const { email, password } = req.body;
  console.log(password)
  const user = await userModel.findOne({ email: email });
  if (!user) {
    res.status(401).json({
      error: {
        message: 'Email or password is wrong',
      },
    });
  } else {
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      console.log("valid")
      const userInfo = {
        name: user.name,
        email: user?.email,
        mobile: user?.mobile,
        userType: user?.userType
      };
      
      // token generate
      const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: 3600000
      });
      res.status(200).json({
        accessToken: token,
        user: {
          name: user?.name,
          email: user?.email,
          mobile: user?.mobile,
          userType: user?.userType
         },
      });
       
    } else {
      res.json({
        error: {
          message: 'email or password is incorrect.',
        },
      });
    }
  }
} catch (error) {
  console.log(error)
  next();
}
}

async function signupUser(req,res,next) {
    try{
      const {name,email,password,mobile,userType} =req.body
      console.log(name,email,password,mobile)
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
          name,
          email,
          password: hashedPassword,
          mobile,
          userType
        });
  
        await newUser.save();
        res.send(newUser)
      } else {
        res.status(500).json({
          error: {
            message: `Email already in use.`,
          },
        });
      }
    } catch (error) {
      next(error);
    }
}

module.exports={loginUser,signupUser}