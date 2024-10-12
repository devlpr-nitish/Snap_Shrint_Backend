import mongoose from "mongoose";

const url = process.env.DB_URL;


const connectToDB = async () => {

    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('Successfully connected to MongoDB');
        })
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong with data base connection");
    }

}

export default connectToDB;