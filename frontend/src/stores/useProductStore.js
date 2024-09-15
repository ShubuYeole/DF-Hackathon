import toast from 'react-hot-toast';
import { create } from "zustand";
import axios from "../lib/axios";

const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,

    fetchAllProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/product");
            set({ products: response.data, loading: false });
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to fetch products.';
            toast.error(errorMessage);
            set({ error, loading: false });
        }
    },

    fetchProductById: async (id) => {
        set({ loading: true });
        try {
            const response = await axios.get(`/product/${id}`);
            set({ loading: false });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to fetch product.';
            toast.error(errorMessage);
            set({ error, loading: false });
            throw error;
        }
    },

    addProduct: async (data) => {
        set({ loading: true });
        try {
            const response = await axios.post('/product', data);
            set((state) => ({
                products: [...state.products, response.data],
                loading: false,
            }));
            toast.success('Product added successfully!');
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to add product.';
            toast.error(errorMessage);
            set({ error, loading: false });
        }
    },

    updateProduct: async (id, data) => {
        set({ loading: true });
        try {
            const response = await axios.patch(`/product/${id}`, data);
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === id ? response.data : product
                ),
                loading: false,
            }));
            toast.success('Product updated successfully!');
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to update product.';
            toast.error(errorMessage);
            set({ error, loading: false });
        }
    },

    deleteProduct: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`/product/${id}`);
            set((state) => ({
                products: state.products.filter((product) => product._id !== id),
                loading: false,
            }));
            toast.success('Product deleted successfully!');
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to delete product.';
            toast.error(errorMessage);
            set({ error, loading: false });
        }
    },

    resetError: () => set({ error: null }),
}));

export default useProductStore;
