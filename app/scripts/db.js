const mongoose = require('mongoose')
const { connectionStr } = require('../config')

mongoose.connect(connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
}).then(() => console.log("MongoDb connected"))
.catch(err => console.log(err))