const mongoose = require("mongoose");
const connectDb = async() => {
    try {
        const connect = await mongoose.connect(
            "mongodb+srv://admin:123456798q@cluster0.zawpkmt.mongodb.net/mycontacts-backend?retryWrites=true&w=majority"
            );
        console.log("Database connect: \n",
        connect.connection.host,
        connect.connection.name)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = connectDb;