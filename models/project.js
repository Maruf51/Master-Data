import mongoose, { models } from "mongoose"

const projectSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: [true, " Unique ID is required"]
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    icon: {
        type: String,
        required: [true, "Icon is required"]
    },
}, {
    timestamps: true,
    versionKey: false
});

const Project = models.Project || mongoose.model('Project', projectSchema)

export default Project;