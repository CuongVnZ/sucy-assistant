const mongoose = require('mongoose');


const connectDB = async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_SRV, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to the database!");
    }).catch((err) => {
        console.log(err)
    });
}

module.exports = connectDB()