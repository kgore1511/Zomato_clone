const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
  name : {
    type:'String',
    require:'true',
  },
  image : {
    type:'String',
    required: 'true'
  },
  restaurant_type: {
    type: 'String',
    required: 'true'
  },
  address: {
    type: 'String',
  require: 'true',
  },
  city: {
    type: 'String',
    require: 'true' 
  },
  mobile : {
    type: 'String',
    required: 'true',
  }

});
module.exports = mongoose.model("restaurants", restaurantSchema);