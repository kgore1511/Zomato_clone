
const Restaurant=require('../models/restaurantModel')
const Menu=require('../models/menuModel')
const cloudinary=require('cloudinary').v2;
require('dotenv').config() 
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
  });
  

const getAllRestaurants=async (req,res) => {
    try {
        const restaurants=await Restaurant.find({});
        res.status(200).send(restaurants)
    }
    catch(err) {
        console.log(err)
    }
}

const getRestaurantDetail=async (req,res)=> {
    try{
    const id=req.params.id
    console.log(id)
    let restaurantDetail=await Restaurant.findById(id)
    if(!restaurantDetail) res.send("Details Not Found")
    let menu=await Menu.find({restaurant_id:id})
console.log(menu[0])
    //menu[0]['price']=parseFloat(menu.price)
        if(!menu) res.err("Menu not found")
        restaurantDetail={detail:restaurantDetail,menu:menu}
    console.log(restaurantDetail)
        res.send(restaurantDetail)
    }
    catch(err) {
        console.log(err)
    }

}

const addMenu=async (req,res)=> {
    try{
    const {restaurant_id,name, price, image} = req.body;
    console.log(image)
    let imageData={}
    await cloudinary.uploader.upload(image, {
        folder: "restaurant_Menu_images",
        resource_type: 'auto'
    }).then(resp => {imageData=resp})
    .catch(err=> {
        console.log(err)
    })

    const imageUrl=imageData?.url

    const menu=new Menu({
        restaurant_id: restaurant_id,
        item_name:name,
        price:price,
        image:imageUrl
    })
    await menu.save()
    res.send(menu)

}
catch(err) {
    console.log(err);
}
}

const getMenu=async (req,res)=> {
    try {
        const id=req.params.id
        const menu=await Menu.find({restaurant_id:id}) 
        res.send(menu) 
    }
    catch(err) {

    }
} 

const addRestaurant=async (req,res)=> {
    try{
        
    const {name,address,mobile,city,image,restaurantType}=req.body
    console.log(image)
    let imageData={}
    await cloudinary.uploader.upload(image, {
        folder: "restaurant_images",
        resource_type: 'auto'
    }).then(resp => {imageData=resp})
    .catch(err=> {
        console.log(err)
    })

    if(!imageData) res.send("Some error occur while uploading image")
    console.log(imageData)
    const imageUrl=imageData?.url

    const restaurant=new Restaurant({
        name:name,
        address:address,
        city:city,
        image:imageUrl,
        mobile:mobile,
        restaurant_type:restaurantType
    })
    await restaurant.save()
    res.send("Data Added Successfully")
}catch(err) { 
    res.send(err)
}
   

}

module.exports={getAllRestaurants, addMenu, getMenu, getRestaurantDetail, addRestaurant}