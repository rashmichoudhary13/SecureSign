import mongoose from "mongoose";

const connectDB = async() => {

    //on listener. It listens future events
    mongoose.connection.on("connected", () => console.log("Database Connected"));

    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`); //mern-auth is database name
};

export default connectDB;