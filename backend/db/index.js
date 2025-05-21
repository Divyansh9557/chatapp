import mongoose from "mongoose"

const connectDb= async()=>{
    try {
        const connect= await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/chat-app" )
        if(connect.connections[0].readyState){
            console.log("mongodb connected successfully")
        }
    } catch (error) {
        console.log("failed to connect db ",error)
    }
}

export default connectDb