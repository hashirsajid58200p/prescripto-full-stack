import mongoose from "mongoose";

const connectDB = async () => {

    if (mongoose.connection.readyState >= 1) {
        return;
    }

    mongoose.connection.on('connected', () => console.log("Database Connected"))
    
    let uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI is missing from environment variables.");
        return;
    }

    // Clean up trailing slash
    let baseUri = uri.endsWith('/') ? uri.slice(0, -1) : uri;

    // Check if database name is already present in URI (before '?' query string or at end of string)
    const hasDbInUri = /\/[a-zA-Z0-9_-]+(\?|$)/.test(baseUri);

    if (hasDbInUri) {
        await mongoose.connect(baseUri);
    } else {
        await mongoose.connect(`${baseUri}/prescripto`);
    }

}

export default connectDB;
