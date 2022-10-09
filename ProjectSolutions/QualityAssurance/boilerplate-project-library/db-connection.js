const mongoose = require('mongoose');
const atlasDB = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = atlasDB;