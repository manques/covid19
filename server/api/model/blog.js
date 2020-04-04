const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  paragraph: { type: String, required: true },
  created: { type: Date, default: new Date() },
  updated: { type: Date, deafult: new Date() },
  review: { type: Schema.Types.ObjectId, ref: 'Review' },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Blog', blogSchema);
