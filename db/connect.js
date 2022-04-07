import mongoose from "mongoose";

const connectDB = (url) => {
    return mongoose.connect(url,{
        useUnifiedTopology:true,
        useNewUrlParser: true,
    })
}

export default connectDB