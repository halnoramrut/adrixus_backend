const mongoose =require( "mongoose");
const { Schema } = mongoose;


const userSchema = new Schema(
    {
      firstname: {
        type: String,
        trim: true,
      },
      lastname: {
          type: String,
          trim: true,
        },
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
     }      
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model('User', userSchema);