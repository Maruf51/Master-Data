import mongoose, { models } from "mongoose"

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: function () {
            return this.auth === 'credentials';
        }
    },
    image: {
        type: String,
        required: false,
    },
    auth: {
        type: String,
        enum: ['credentials', 'google'],
        required: true,
        default: 'credentials'
    }
}, {
    timestamps: true,
    versionKey: false
});

const User = models.User || mongoose.model('User', userScheme)

export default User;