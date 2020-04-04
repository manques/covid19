const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true},
  email: { type: String, required: true},
  phone: { type: Number, required: true},
  password: { type: String, required: true },
  image: { type:String},
  role: { type: String, Default: 'normal'}
});

module.exports = mongoose.model('User', userSchema);
