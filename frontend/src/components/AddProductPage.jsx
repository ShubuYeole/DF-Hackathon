import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useCategoryStore from '../stores/useCategoryStore';
import useProductStore from '../stores/useProductStore';

const AddProductPage = () => {
    const navigate = useNavigate();
    const { addProduct } = useProductStore();
    const { fetchCategories, categories } = useCategoryStore();
    const [product, setProduct] = useState({
        name: '',
        packSize: '',
        price: '',
        image: '',
        status: '',
        categoryId: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchCategories();
            } catch (err) {
                toast.error('Failed to load categories.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [fetchCategories]);

    const handleChange = e => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Adding product with data:', product);
            await addProduct(product);
            navigate('/products');
        } catch (err) {
            toast.error('Failed to add product. Please try again.');
            setError('Failed to add product.');
        }
    };


    const handleBackClick = () => {
        navigate('/products');
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center mb-4">
                <button
                    onClick={handleBackClick}
                    className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full transition duration-150 ease-in-out"
                    aria-label="Back to Products"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold ml-4">Add Product</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="packSize" className="block text-sm font-medium text-gray-700">Pack Size</label>
                    <input
                        type="text"
                        id="packSize"
                        name="packSize"
                        value={product.packSize || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={product.categoryId || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md w-full"
                        required
                    >
                        <option value="">Select category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={product.image || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={product.status || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md w-full"
                        required
                    >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
