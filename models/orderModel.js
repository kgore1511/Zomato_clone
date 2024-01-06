const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    },
    order_total: {
        type: Schema.Types.Decimal128,
        require: 'true'
    },
    delivery_status: {
        type: 'String',
        required: 'true',
    }

});
module.exports = mongoose.model("orders", orderSchema);