// const mongoose = require('mongoose')

// const { Schema, model } = mongoose

// const topicSchema = new Schema({
//   __v: { type: Number, select: false },
//   name: { type: String, required: true },
//   avatar_url: { type: String },
//   introduction: { type: String, select: false }
// })

// // 生成一个User集合
// module.exports =  model('Topic', topicSchema)

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const BlogSchema = new Schema({
  versionKey: false,
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: false },
  tag: { type: String, required: false },
  time: { type: String, required: false },
}, { timestamps: true, versionKey: false });

module.exports = model('Blog', BlogSchema);
