import toast from 'react-hot-toast';
import { create } from 'zustand';
import axios from '../lib/axios';

const useCategoryStore = create((set) => ({
    categories: [],
    loading: false,
    error: null,

    fetchCategories: async () => {
        set({ loading: true });
        try {
            const response = await axios.get('/category');
            set({ categories: response.data, loading: false });
            return response.data;
        } catch (error) {
            set({ error: error.response?.data || 'Error fetching categories', loading: false });
            toast.error(error.response?.data.message || 'Failed to fetch categories');
            throw error;
        }
    },

    fetchCategoryById: async (id) => {
        try {
            const response = await axios.get(`/category/${id}`);
            return response.data;
        } catch (error) {
            toast.error(error.response?.data.message || 'Failed to fetch category by ID');
            throw error;
        }
    },

    patchCategory: async (id, data) => {
        set({ loading: true });
        try {
            console.log('Sending data to update:', data);
            const response = await axios.patch(`/category/${id}`, data);
            console.log('Update response:', response.data);
            set((state) => ({
                categories: state.categories.map((category) =>
                    category.id === id ? response.data : category
                ),
                loading: false,
            }));
            toast.success('Category updated successfully!');
        } catch (error) {
            console.error('Update error:', error);
            set({ error: error.response?.data || 'Error updating category', loading: false });
            toast.error(error.response?.data.message || 'Failed to update category');
        }
    },

    deleteCategory: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`/category/${id}`);
            set((state) => ({
                categories: state.categories.filter((category) => category.id !== id),
                loading: false,
            }));
            toast.success('Category deleted successfully!');
        } catch (error) {
            set({ error: error.response?.data || 'Error deleting category', loading: false });
            toast.error(error.response?.data.message || 'Failed to delete category');
        }
    },

    addCategory: async (data) => {
        set({ loading: true });
        try {
            const response = await axios.post('/category', data);
            set((state) => ({
                categories: [...state.categories, response.data],
                loading: false,
            }));
            toast.success('Category added successfully!');
        } catch (error) {
            set({ error: error.response?.data || 'Error adding category', loading: false });
            toast.error(error.response?.data.message || 'Failed to add category');
        }
    },
}));

export default useCategoryStore;
