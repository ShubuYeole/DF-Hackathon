import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Edit, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import useCategoryStore from '../stores/useCategoryStore';
import useProductStore from '../stores/useProductStore';

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
    <input
        type="text"
        id="search"
        name="search"
        value={globalFilter || ''}
        onChange={e => setGlobalFilter(e.target.value || undefined)}
        placeholder="Search products by name..."
        className="border border-gray-300 p-2 rounded-md w-full md:w-1/3 lg:w-1/4"
    />
);

const ProductPage = () => {
    const { products, loading, error, fetchAllProducts, deleteProduct } = useProductStore();
    const { categories, fetchCategories } = useCategoryStore();
    const navigate = useNavigate();
    const [categoryMap, setCategoryMap] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchAllProducts();
                const fetchedCategories = await fetchCategories();
                const categoryMapping = fetchedCategories.reduce((map, category) => {
                    map[category._id] = category.name;
                    return map;
                }, {});
                setCategoryMap(categoryMapping);
            } catch (err) {
                toast.error('Failed to fetch data.');
                console.error('Failed to fetch data:', err);
            }
        };
        fetchData();
    }, [fetchAllProducts, fetchCategories]);

    // Define table data
    const data = useMemo(
        () => products.map((product, index) => ({
            id: index + 1,
            _id: product._id,
            name: product.name,
            packSize: product.packSize,
            price: `Rs. ${product.price}`,
            categoryName: categoryMap[product.categoryId] || 'Unknown',
            image: product.image,
            status: product.status,
        })),
        [products, categoryMap]
    );

    // Define table columns
    const columns = useMemo(
        () => [
            { Header: 'ID', accessor: 'id', sortType: 'basic' },
            { Header: 'Name', accessor: 'name', sortType: 'basic' },
            { Header: 'Pack Size', accessor: 'packSize' },
            { Header: 'Price', accessor: 'price' },
            { Header: 'Category', accessor: 'categoryName' },
            { Header: 'Image', accessor: 'image', Cell: ({ value }) => <img src={value} alt="Product" className="w-24 h-24 object-cover" /> },
            { Header: 'Status', accessor: 'status' },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div className="flex gap-2 justify-center">
                        {/* Edit button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(`/product/edit/${row.original._id}`)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition duration-150 ease-in-out"
                            aria-label="Edit product"
                        >
                            <Edit size={18} />
                        </motion.button>
                        {/* Delete button with confirmation */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={async () => {
                                if (window.confirm('Are you sure you want to delete this product?')) {
                                    try {
                                        await deleteProduct(row.original._id);
                                        toast.success('Product deleted successfully!');
                                    } catch (err) {
                                        toast.error('Failed to delete product.');
                                    }
                                }
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition duration-150 ease-in-out"
                            aria-label="Delete product"
                        >
                            <Trash2 size={18} />
                        </motion.button>
                    </div>
                ),
            },
        ],
        [navigate, deleteProduct]
    );


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
        state: { globalFilter },
    } = useTable(
        { columns, data },
        useGlobalFilter,
        useSortBy
    );

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Products</h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/product/new')}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center gap-2 transition duration-150 ease-in-out"
                >
                    <Plus size={18} /> Add New
                </motion.button>
            </div>

            {/* Search Input */}
            <div className="mb-4">
                <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <motion.table
                        {...getTableProps()}
                        className="min-w-full divide-y divide-gray-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <thead className="bg-gray-50">
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            key={column.id}
                                            className="px-4 py-2 border-b text-left cursor-pointer"
                                        >
                                            {column.render('Header')}
                                            {/* Add sorting icons */}
                                            <span className="ml-2">
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <ChevronDown size={16} className="inline-block text-black" />
                                                    ) : (
                                                        <ChevronUp size={16} className="inline-block text-black" />
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <motion.tr
                                        {...row.getRowProps()}
                                        key={row.id}
                                        className="border-b"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()} key={cell.column.id} className="px-4 py-2 border-b">
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </motion.table>
                </div>
            )}
            <Toaster />
        </div>
    );
};

export default ProductPage;
