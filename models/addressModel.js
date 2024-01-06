const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  user_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require:'true',
  },
  state: {
    type: 'String',
  require: 'true',
  },
  city: {
    type: 'String',
    require: 'true',
  },
  pincode : {
    type: 'String',
    required: 'true',
  }

});
module.exports = mongoose.model("addresses", addressSchema);