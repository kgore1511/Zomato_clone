const router=require('express').Router();
const {getAllRestaurants, getMenu, getRestaurantDetail, addRestaurant, addMenu}=require('../controllers/restaurantController')

router.post('/addRestaurant',addRestaurant)
router.get('/getAllRestaurants',getAllRestaurants)
router.get('/detail/:id',getRestaurantDetail);
router.post('/addMenu/',addMenu);
router.get('/getMenu/:id',getMenu);

module.exports=router