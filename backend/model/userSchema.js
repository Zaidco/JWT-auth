const mongoose = require('mongoose');
const {Schema} = mongoose;
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
      name:{
        type: String,
        require:[true,'user name is Required'],
        minLength: [5,"Name must be of atleast 5 characters long"],
        maxLength:[50,"Name must be less tham 50 characters"],
        trim:true
      },
      email:{
        type: String,
        required:[true,"user email is required"],
        unique: true,
        lowercase: true,
        unique:[true,"already registered"]
      },
      password:{
        type: String,
        select: false
      },

      forgotPassword:{
        type: String,
      },
      forgotPasswordExpiryDate:{
        type: Date
      },
    },{
        timestamps:true
    });


    userSchema.pre('Save',async function(next){
        if(!this.isModified('password')){
            return nect();
        }
        this.password= await bcrypt.hash(this.password,10);
        return next();
    })
    
    userSchema.method={
        jwtToken(){
            return JWT.sign(
            {id: this._id,email:this.email},
            process.env.SECRET,
            {expiresIn: '24h'}
         )
        }
    }



const userModel = mongoose.model('user',userSchema)
module.exports= userModel;