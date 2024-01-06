const mongoose = require("mongoose");
const restaurantModel= require("./restaurantModel");
const menuSchema = new mongoose.Schema({
  restaurant_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : restaurantModel,
    require:'true',
  },
  item_name: {
    type: 'String',
  require: 'true',
  },
  image: {
    type: 'String',
    require: 'true'
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    require: 'true',
  },
},
  {
    toJSON: {
    transform: function(doc, ret)  {
      ret.price = ret.price.toString();
      return ret;
    },
  },
}
);


module.exports = mongoose.model("menus", menuSchema);