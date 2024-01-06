const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name : {
    type:'String',
    require:'true',
  },
  email: {
    type: 'String',
  require: 'true',
  },
  userType: {
    type: 'number',
    require:'true',
  },
  password: {
    type: 'String',
    require: 'true',
  },
  mobile : {
     type: 'String',
    required: 'true',
  },
  userType: {
    type: 'Boolean',
    default: 'false'
  }

});
module.exports = mongoose.model("users", userSchema);