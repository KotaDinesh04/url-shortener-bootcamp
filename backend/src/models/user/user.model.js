import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://avatar.iran.liara.run/public'
    },
    role: {
        type: String,
        default: 'user'
    }
    
}, { timestamps: true })


export default mongoose.model('user', userSchema);