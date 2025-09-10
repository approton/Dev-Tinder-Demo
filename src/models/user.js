const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value) {
            if(!["Male", "Female", "M", "F", "Others"].toString().toLowerCase().includes(value.toLowerCase())){
                throw new Error("Gender Data is Invalid!")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg"
    },
    about: {
        type: String,
        default: "This is default About of the User",
        minLength: 50,
        maxLength: 255
    },
    skills: {
        type: [String]
    },
    interests: {
        type: [String]
    }
});
userSchema.index({emailId: 1}, {unique: true});
const User = mongoose.model("User", userSchema)

module.exports={
    User,
}