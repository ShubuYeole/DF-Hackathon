import Category from "../models/category.model.js";


export const createCategory = async (req, res) => {
    const { name, description, status } = req.body;
    try {
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category with this name already exists" });
        }
        const category = await Category.create({ name, description, status });
        res.status(201).json({
            _id: category._id,
            name: category.name,
            description: category.description,
            status: category.status,
        });
    } catch (error) {
        console.log("Error in createCategory controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log("Error in getCategories controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        console.log("Error in getCategory controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateCategory = async (req, res) => {
    const { name, description, status } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, { name, description, status }, { new: true });
        res.status(200).json(category);
    } catch (error) {
        console.log("Error in updateCategory controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        console.log("Error in deleteCategory controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};