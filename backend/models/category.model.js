import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: [true, "Name must be unique"],
            trim: true,
            validate: {
                validator: function (value) {
                    return value !== null;
                },
                message: "Name cannot be null"
            }
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;