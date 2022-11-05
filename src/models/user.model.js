const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true}, 
  password: { type: String, required: true },
  user_type:  { 
    type: String, 
    required: true, 
    enum: ['user', 'admin'], 
    default: 'user' 
  }
  // articles: {
  //    type: mongoose.Types.ObjectId,
  //    ref: 'Articles'
  //   }
  
});

userSchema.virtual('articles', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'author'
})

const User = mongoose.model('User', userSchema);

module.exports = User;
