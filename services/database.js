const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
module.exports = mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => {
    console.log("Connected to the database!");
}).catch((err) => {
    console.log(err)
});