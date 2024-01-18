const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        title: { type: String, required: true, unique: true },
        detail: { type: String, required: true, unique: true },
        
    },
    {
        timestamps: true,
    }
);
const Contact = mongoose.model('Contact', topicSchema);

module.exports = Contact;
