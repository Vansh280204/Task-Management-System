const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },

        type: { type: String, enum: ["COMPANY", "SCHOOL", "COLLEGE", "OTHER"], default: "OTHER" },

        description: { type: String, trim: true, maxlength: 500, default: null },

        logo: { type: String, trim: true, default: null },

        website: { type: String, trim: true, default: null },

        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        isActive: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Organization", organizationSchema);