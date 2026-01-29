import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState, useMemo, useEffect } from 'react';
import {
    BsGrid3X3GapFill,
    BsListUl,
    BsSearch,
    BsPlusLg,
    BsChevronLeft,
    BsChevronRight,
    BsEye,
    BsPencilSquare,
    BsTrash
} from 'react-icons/bs';
import { Link, useNavigate } from 'react-router';
import api from '../../services/api';
import AlertQuestionBox from '../../services/AlertQuestionBox';
import { useAlert } from '../../hooks/AlertContext';
import items from '../../data/product';



const ProductListPage = () => {
    const token = localStorage.getItem('token');
    const [products, setProducts] = useState();
    const navigater = useNavigate();
    const [page, setPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const alert = useAlert();


    const fetchProducts = async ({ queryKey }) => {
        const [_key, page] = queryKey; // extract page from queryKey
        const res = await api.get(`products?limit=10&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    };

    const delProductApi = async (id) => {
        const res = await api.delete(`products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    };

    const { mutate: deleteProduct, isPending: delPending } = useMutation({
        mutationKey: ['products', 'delete'],
        mutationFn: delProductApi,
        onSuccess: () => {
            setTimeout(() => {
                alert.success('Product deleted successfully!', 'Delete Product', {
                    duration: 1000,
                    position: 'top-center',
                });
            }, 200)
            queryClient.invalidateQueries({ queryKey: ['products'] });
            setIsOpen(false);
        },
        onError: (err) => {
            console.error(err?.response?.data || err?.message);
            setTimeout(() => {
                alert.error('Product deleted failed!', 'Delete Product', {
                    duration: 5000,
                    position: 'top-center',
                });
            }, 200)
        }
    });

    const handleDel = (id) => {
        setDelId(id);
        setIsOpen(true);
    };

    const handleAction = () => {
        deleteProduct(delId);
    };

    const { data, error, isPending, isError, isFetching, isSuccess, refetch, status } = useQuery({
        queryKey: ['products', page], // include page here
        queryFn: fetchProducts,
        keepPreviousData: true, // smooth pagination
        staleTime: 5000,
    });
    useEffect(() => {
        setProducts(items);
        // console.log(data);

    }, [data]);


    // States
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const [searchTerm, setSearchTerm] = useState('');

    const handlePageChange = (url) => {
        if (!url) return;
        const pageParam = new URL(url).searchParams.get('page');
        setPage(Number(pageParam));
    };

    return (
        <div className="p-4 md:p-8 bg-transparent dark:text-gray-200 min-h-screen">
            <AlertQuestionBox
                isOpen={isOpen}
                type="question"
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone"
                confirmText="Ok"
                cancelText="Cancecl"
                confirmColor="danger"
                loading={delPending}
                onConfirm={handleAction}
                onCancel={() => setIsOpen(false)}
            />
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products List</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your inventory items</p>
                </div>

                <button onClick={() => navigater(`create`)} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
                    <BsPlusLg /> <span>Create New</span>
                </button>
            </div>

            {/* Toolbar Section */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center border border-gray-200 dark:border-gray-700">
                <div className="relative w-full md:w-96">
                    <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by name or code..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                        <BsGrid3X3GapFill size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('table')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                        <BsListUl size={20} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products?.data?.map((product) => (
                        <div key={product.item_id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-shadow">
                            <div onClick={() => navigater(`view/${product.item_id}`)} className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center cursor-pointer">
                                {product.images.length > 0 ? (
                                    <img src={product.images[0].image_url} alt={product.item_name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-gray-400 dark:text-gray-500">No Image</span>
                                )}
                            </div>
                            <div className="p-4">
                                <span className="text-xs font-mono text-gray-400 dark:text-gray-500">{product.item_code}</span>
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{product.item_name}</h3>
                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-blue-600 dark:text-blue-400 font-bold">${product.unit_price}</span>
                                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded">Discount: ${product.discount}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold">Image</th>
                                <th className="px-6 py-4 text-sm font-semibold">Code</th>
                                <th className="px-6 py-4 text-sm font-semibold">Product</th>
                                <th className="px-6 py-4 text-sm font-semibold">Price</th>
                                <th className="px-6 py-4 text-sm font-semibold">Attributes</th>
                                <th className="px-6 py-4 text-sm font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {products?.data?.map((product) => (
                                <tr key={product.item_id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td>
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden border border-gray-200 dark:border-gray-600">
                                            {product.images.length > 0 ? (
                                                <img src={product.images[0].image_url} alt="item" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 dark:text-gray-500">No Img</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-mono text-gray-500 dark:text-gray-400">{product.item_code}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">{product.item_name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">${product.unit_price}</td>
                                    <td className="px-6 py-4">
                                        {product.attributes.map(attr => (
                                            <span key={attr.attr_id} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded mr-1">
                                                {attr.attr_name}: {attr?.attr_values?.map(value => value).join(',')}
                                            </span>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to={`view/${product.item_id}`}><button title="View" className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"><BsEye size={16} /></button></Link>
                                        <Link to={`edit/${product.item_id}`}><button title="Edit" className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors"><BsPencilSquare size={16} /></button></Link>
                                        <button onClick={() => handleDel(product.item_id)} title="Delete" className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"><BsTrash size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination Section */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t mt-4 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 flex items-center justify-between rounded-b-xl">
                <p className="text-sm ">
                    Showing <span className="font-semibold">{products?.data?.length}</span> results
                </p>
                <div className="flex gap-1">
                    {products?.links?.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url || link.active}
                            onClick={() => handlePageChange(link.url)}
                            className={`px-3 py-1 rounded border text-sm transition-all ${link.active
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50'
                                }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ProductListPage;