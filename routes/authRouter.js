const router=require('express').Router();
const {loginUser,signupUser}=require('../controllers/authController')

router.post('/signin',loginUser)
router.post('/signup',signupUser)

module.exports=router