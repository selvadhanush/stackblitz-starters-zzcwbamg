const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 50,  
    minlength: 3,   
    unique: true    
  },
  email:{
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true
  },

  roles: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  }
});



let profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", 
    required: true
  },
  profile: {
    firstName: String,
    lastName: String,
    age: Number
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
},{ timestamps: true }
);

let UserModel = mongoose.model("user", userSchema);
let ProfileModel = mongoose.model("profile", profileSchema);

module.exports = { UserModel, ProfileModel };
