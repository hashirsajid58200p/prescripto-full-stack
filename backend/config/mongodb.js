import mongoose from "mongoose";

const connectDB = async () => {

    if (mongoose.connection.readyState >= 1) {
        return;
    }
    
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI is missing.");
        return;
    }

    try {
        if (uri.includes('/prescripto')) {
            await mongoose.connect(uri);
        } else {
            await mongoose.connect(`${uri.replace(/\/$/, '')}/prescripto`);
        }
        console.log("Database Connected Successfully");
    } catch (err) {
        console.error("Database connection failed:", err);
    }

}

export default connectDB;
