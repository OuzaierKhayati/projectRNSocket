const mongoose = require ("mongoose");

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Login-tut", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database cannot be connected", error);
        process.exit(1); // Exit the process with a failure code
    }
};

connectDB();

// Create a schema 
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }

});

// Collection PART

module.exports = mongoose.model("DataModel" , loginSchema);