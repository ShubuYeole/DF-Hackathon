import Product from "../models/product.model.js";


export const createProduct = async (req, res) => {
    const { name, packSize, price, categoryId, image, status } = req.body;
    try {
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ message: "Product with this name already exists" });
        }
        const product = await Product.create({ name, packSize, price, categoryId, image, status });
        res.status(201).json({
            _id: product._id,
            name: product.name,
            categoryId: product.categoryId,
            status: product.status,
        });
    } catch (error) {
        console.log("Error in createProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json((products));
    } catch (error) {
        console.log("Error in getProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        console.log("Error in getProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { name, packSize, price, categoryId, image, status } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { name, packSize, price, categoryId, image, status }, { new: true });
        res.status(200).json(product);
    } catch (error) {
        console.log("Error in updateProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};