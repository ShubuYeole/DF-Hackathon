import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
        packSize: {
            type: String,
            required: [true, "Pack Size is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"],
        },
        image: {
            type: String,
            required: [true, "Image is required"],
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

const Product = mongoose.model("Product", productSchema);

export default Product;
