const express=require('express')
const app=express();
const mongoose=require('mongoose')
const addresses=require('./models/addressModel')
const users=require('./models/userModel')
const cors = require('cors');
const bodyParser = require('body-parser');
const menuModel = require('./models/menuModel')
const restaurantRoutes = require('./routes/restaurantRouter')
const authRoutes=require("./routes/authRouter");
const restaurantModel = require('./models/restaurantModel');
require('dotenv').config() 
const stripe = require("stripe")('sk_test_51OLKRPSIsh9qapnRBZQMqi7QeTcMkmEQQ9SDC2ULXepiJ7OdS8XhwdMUCv65DwUxVhWPiYmpYf7DxVrLbhYjWLJC00HCTzsXLU');
const port =process.env.Port || 5000;
var jsonParser = bodyParser.json({limit:1024*1024*10, type:'application/json'}); 
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*10,type:'application/x-www-form-urlencoded' });
app.use(jsonParser);
app.use(urlencodedParser);
const uri='mongodb+srv://kgore1511:Khushalgore%40702@cluster0.drm9w.mongodb.net/zomato_db?authSource=admin&replicaSet=atlas-mumhy2-shard-0&readPreference=primary&ssl=true'
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}


if(process.env.NODE_ENV=='production') {
    const path=require('path')

    app.get('/',(req,res)=> {
        app.use(express.static(path.resolve(__dirname,'client','build')))
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


// app.get('api/restaurants/:category',(req,res)=> {
//     res.send(req.params['category'])
// })

if(process.env.NODE_ENV=='production') {
    const path=require('path')

    app.get('/',(req,res)=> {
        app.use(express.static(path.resolve(__dirname,'client','build')))
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.use(cors());
// parse json data
// parse application/x-www-form-urlencoded
//app.use(bodyParser.json());
// parse application/json
app.use(express.json());
app.use('/api/auth',authRoutes)
app.use('/api/partner',restaurantRoutes)
app.use('/api/restaurant',restaurantRoutes)

app.post('/search', async (req,res)=> {
    let searchKey=req.body.key
    searchKey=searchKey.join('|')
    console.log(searchKey)
   let data = await menuModel.find(
        {item_name : {$regex: "^"+searchKey,$options: 'i'}
})

const restaurantData=await restaurantModel.find(
    {name : {$regex: "^"+searchKey,$options: 'i'}
})
data=[...data,...restaurantData]
    console.log(data)
    res.send(data)
})

mongoose.connect(uri,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


    app.post("/api/create-checkout-session",async(req,res)=>{
        const cartItems = req.body.cartItems;

        const lineItems = cartItems.map((product)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:product.item_name,
                    images:[product.image]
                },
                unit_amount:product.price * 100,
            },
            quantity:product.qty
        }));
    
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"http://localhost:3000/sucess",
            cancel_url:"http://localhost:3000/cancel",
        });
    
        res.json({id:session.id})
     
    })



app.listen(port,()=>{
    console.log("server started at port ",port)
})
