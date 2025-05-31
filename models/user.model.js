import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true },
        password: { type: String, select: false },
        lastLogin: { type: Date, default: Date.now },
        phone: String,
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    // Only hash the password if it's new or modified
    if (!this.isModified("password")) return next();

    try {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
