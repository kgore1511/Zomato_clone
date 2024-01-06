const mongoose = require("mongoose");
const driverSchema = new mongoose.Schema({
  name : {
    type:'String',
    require:'true',
  },
  email: {
    type: 'String',
  require: 'true',
  },
  location: {
    type: 'String',
    require: 'true',
  },
  phone : {
    type: 'String',
    required: 'true',
  }

});
module.exports = mongoose.model("drivers", driverSchema);