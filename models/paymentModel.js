const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  name : {
    type:'String',
    require:'true',
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders',
    require: 'true',
  },
  paymnet_method: {
    type: 'String',
    require: 'true',
  },
  amount : {
    type: mongoose.Schema.Types.Decimal128,
    required: 'true',
  },
  status : {
    type : 'String',
    require: 'true'
  }
});
module.exports = mongoose.model("payments", paymentSchema);