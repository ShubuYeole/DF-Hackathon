import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCategoryStore from '../stores/useCategoryStore';

const EditCategoryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchCategoryById, patchCategory } = useCategoryStore();
    const [category, setCategory] = useState({
        name: '',
        description: '',
        status: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategory = async () => {
            const data = await fetchCategoryById(id);
            setCategory(data);
            setLoading(false);
        };
        loadCategory();
    }, [id, fetchCategoryById]);

    const handleChange = e => {
        const { name, value } = e.target;
        setCategory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await patchCategory(id, category);
        navigate('/category');
    };

    const handleBackClick = () => {
        navigate('/category');
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center mb-4">
                <button
                    onClick={handleBackClick}
                    className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full transition duration-150 ease-in-out"
                    aria-label="Back to Categories"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold ml-4">Edit Category</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={category.description}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md w-full"
                        rows="4"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={category.status}
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
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditCategoryPage;
