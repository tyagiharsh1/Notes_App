const mongoose = require('mongoose');
const mongourl = "mongodb+srv://500091612:qpVyxEFWpWqiW6tb@cluster0.3waqzev.mongodb.net/notebookdb?retryWrites=true&w=majority";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
