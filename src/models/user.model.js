const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true}, 
  password: { type: String, required: true },
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
  
});

// userSchema.virtual('articles', {
//   ref: 'Blog',
//   localField: '_id',
//   foreignField: 'author'
// })

const User = mongoose.model('User', userSchema);

module.exports = User;
