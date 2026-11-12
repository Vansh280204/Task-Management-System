const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 200 },

        email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Invalid email address"] },

        passwordHash: { type: String, required: true, select: false },

        phone: { type: String, required: true, unique: true, trim: true, match: [/^\+?[0-9]{7,15}$/, "Invalid phone number"] },

        address: { type: String, required: true, trim: true, maxlength: 400 },

        isPlatformAdmin: { type: Boolean, default: false },

        isActive: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);