const mongoose = require("mongoose");

const organizationMemberSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },

        role: { type: String, enum: ["OWNER", "MANAGER", "MEMBER"], default: "MEMBER", required: true },

        status: { type: String, enum: ["ACTIVE", "INVITED", "SUSPENDED"], default: "INVITED", required: true },

        invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

        joinedAt: { type: Date, default: null }
    },
    {
        timestamps: true
    }
);

organizationMemberSchema.index(
    { user: 1, organization: 1 },
    { unique: true }
);

module.exports = mongoose.model("OrganizationMember", organizationMemberSchema);