const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/sybsCraftyShack');
/*shows queries in terminal*/
mongoose.set('debug', true);

module.exports = mongoose.connection;