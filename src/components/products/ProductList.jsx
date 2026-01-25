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

const items = {
    "success": true,
    "message": "Item list retrieved successfully",
    "data": [
        {
            "item_id": 1,
            "item_code": "202601246592",
            "item_name": "Tex Oil",
            "unit_price": "15.00",
            "discount": "5.00",
            "category_id": 1,
            "brand_id": 1,
            "description": "Good and smooth",
            "created_by": 1,
            "images": [
                {
                    "image_id": 1,
                    "image_name": "oil1.png",
                    "image_url": "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0"
                }
            ],
            "attributes": [
                { "attr_name": "size", "attr_values": ["XL"] }
            ]
        },
        {
            "item_id": 2,
            "item_code": "202601246593",
            "item_name": "Engine Oil Pro",
            "unit_price": "22.00",
            "discount": "3.00",
            "category_id": 1,
            "brand_id": 2,
            "description": "High performance engine oil",
            "created_by": 1,
            "images": [
                {
                    "image_id": 2,
                    "image_name": "oil2.png",
                    "image_url": "https://images.unsplash.com/photo-1615906655593-ad0386982a0f"
                }
            ],
            "attributes": [
                { "attr_name": "grade", "attr_values": ["5W-30"] }
            ]
        },
        {
            "item_id": 3,
            "item_code": "202601246594",
            "item_name": "Brake Fluid",
            "unit_price": "8.50",
            "discount": "0.00",
            "category_id": 2,
            "brand_id": 1,
            "description": "DOT 3 brake fluid",
            "created_by": 1,
            "images": [
                {
                    "image_id": 3,
                    "image_name": "brake.png",
                    "image_url": "https://images.unsplash.com/photo-1600359756098-8bc8f07d94e5"
                }
            ],
            "attributes": [
                { "attr_name": "type", "attr_values": ["DOT3"] }
            ]
        },
        {
            "item_id": 4,
            "item_code": "202601246595",
            "item_name": "Hydraulic Oil",
            "unit_price": "18.00",
            "discount": "2.00",
            "category_id": 1,
            "brand_id": 3,
            "description": "Industrial hydraulic oil",
            "created_by": 1,
            "images": [
                {
                    "image_id": 4,
                    "image_name": "hydraulic.png",
                    "image_url": "https://images.unsplash.com/photo-1586864387789-628af9feed72"
                }
            ],
            "attributes": [
                { "attr_name": "grade", "attr_values": ["ISO 46"] }
            ]
        },
        {
            "item_id": 5,
            "item_code": "202601246596",
            "item_name": "Coolant Liquid",
            "unit_price": "10.00",
            "discount": "1.00",
            "category_id": 3,
            "brand_id": 2,
            "description": "Engine cooling liquid",
            "created_by": 1,
            "images": [
                {
                    "image_id": 5,
                    "image_name": "coolant.png",
                    "image_url": "https://images.unsplash.com/photo-1621947081720-86970823b77a"
                }
            ],
            "attributes": [
                { "attr_name": "color", "attr_values": ["Green"] }
            ]
        },

        {
            "item_id": 6,
            "item_code": "202601246597",
            "item_name": "Gear Oil",
            "unit_price": "20.00",
            "discount": "2.50",
            "category_id": 1,
            "brand_id": 3,
            "description": "Smooth gear shifting oil",
            "created_by": 1,
            "images": [
                {
                    "image_id": 6,
                    "image_name": "gear.png",
                    "image_url": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7"
                }
            ],
            "attributes": [
                { "attr_name": "viscosity", "attr_values": ["75W-90"] }
            ]
        },
        {
            "item_id": 7,
            "item_code": "202601246598",
            "item_name": "Power Steering Oil",
            "unit_price": "12.00",
            "discount": "1.50",
            "category_id": 1,
            "brand_id": 2,
            "description": "Smooth steering control",
            "created_by": 1,
            "images": [
                {
                    "image_id": 7,
                    "image_name": "steering.png",
                    "image_url": "https://images.unsplash.com/photo-1597764699513-9b6b80b0f1d6"
                }
            ],
            "attributes": [
                { "attr_name": "type", "attr_values": ["ATF"] }
            ]
        },
        {
            "item_id": 8,
            "item_code": "202601246599",
            "item_name": "Transmission Oil",
            "unit_price": "25.00",
            "discount": "4.00",
            "category_id": 1,
            "brand_id": 4,
            "description": "Automatic transmission oil",
            "created_by": 1,
            "images": [
                {
                    "image_id": 8,
                    "image_name": "transmission.png",
                    "image_url": "https://images.unsplash.com/photo-1558981806-ec527fa84c39"
                }
            ],
            "attributes": [
                { "attr_name": "type", "attr_values": ["Automatic"] }
            ]
        },
        {
            "item_id": 9,
            "item_code": "202601246600",
            "item_name": "Industrial Lubricant",
            "unit_price": "30.00",
            "discount": "5.00",
            "category_id": 4,
            "brand_id": 5,
            "description": "Heavy duty industrial use",
            "created_by": 1,
            "images": [
                {
                    "image_id": 9,
                    "image_name": "industrial.png",
                    "image_url": "https://images.unsplash.com/photo-1581090700227-1e37b190418e"
                }
            ],
            "attributes": [
                { "attr_name": "usage", "attr_values": ["Factory"] }
            ]
        },
        {
            "item_id": 10,
            "item_code": "202601246601",
            "item_name": "Synthetic Oil X",
            "unit_price": "28.00",
            "discount": "3.00",
            "category_id": 1,
            "brand_id": 4,
            "description": "Premium synthetic oil",
            "created_by": 1,
            "images": [
                {
                    "image_id": 10,
                    "image_name": "synthetic.png",
                    "image_url": "https://images.unsplash.com/photo-1581092919534-1ec5c6b9d36b"
                }
            ],
            "attributes": [
                { "attr_name": "grade", "attr_values": ["5W-40"] }
            ]
        },

        { "item_id": 11, "item_code": "202601246602", "item_name": "Diesel Oil", "unit_price": "19.00", "discount": "2.00", "category_id": 1, "brand_id": 1, "description": "For diesel engines", "created_by": 1, "images": [{ "image_id": 11, "image_name": "diesel.png", "image_url": "https://images.unsplash.com/photo-1600369671737-8b5c6a33a7bb" }], "attributes": [{ "attr_name": "engine", "attr_values": ["Diesel"] }] },
        { "item_id": 12, "item_code": "202601246603", "item_name": "Motor Oil Basic", "unit_price": "14.00", "discount": "1.00", "category_id": 1, "brand_id": 2, "description": "Daily motor oil", "created_by": 1, "images": [{ "image_id": 12, "image_name": "motor.png", "image_url": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7" }], "attributes": [{ "attr_name": "grade", "attr_values": ["10W-30"] }] },
        { "item_id": 13, "item_code": "202601246604", "item_name": "Racing Oil", "unit_price": "35.00", "discount": "6.00", "category_id": 1, "brand_id": 6, "description": "High speed racing oil", "created_by": 1, "images": [{ "image_id": 13, "image_name": "racing.png", "image_url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70" }], "attributes": [{ "attr_name": "performance", "attr_values": ["Racing"] }] },
        { "item_id": 14, "item_code": "202601246605", "item_name": "Chain Lubricant", "unit_price": "9.00", "discount": "0.50", "category_id": 4, "brand_id": 3, "description": "Bike chain lubricant", "created_by": 1, "images": [{ "image_id": 14, "image_name": "chain.png", "image_url": "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023" }], "attributes": [{ "attr_name": "use", "attr_values": ["Motorbike"] }] },
        { "item_id": 15, "item_code": "202601246606", "item_name": "ATF Oil", "unit_price": "17.00", "discount": "2.00", "category_id": 1, "brand_id": 4, "description": "Automatic transmission fluid", "created_by": 1, "images": [{ "image_id": 15, "image_name": "atf.png", "image_url": "https://images.unsplash.com/photo-1601924928376-a2f8a8b31f6b" }], "attributes": [{ "attr_name": "type", "attr_values": ["ATF"] }] },
        { "item_id": 16, "item_code": "202601246607", "item_name": "Fork Oil", "unit_price": "13.00", "discount": "1.00", "category_id": 1, "brand_id": 2, "description": "Motorcycle fork oil", "created_by": 1, "images": [{ "image_id": 16, "image_name": "fork.png", "image_url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c" }], "attributes": [{ "attr_name": "weight", "attr_values": ["10W"] }] },
        { "item_id": 17, "item_code": "202601246608", "item_name": "Compressor Oil", "unit_price": "21.00", "discount": "2.00", "category_id": 4, "brand_id": 5, "description": "Air compressor oil", "created_by": 1, "images": [{ "image_id": 17, "image_name": "compressor.png", "image_url": "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc" }], "attributes": [{ "attr_name": "machine", "attr_values": ["Compressor"] }] },
        { "item_id": 18, "item_code": "202601246609", "item_name": "Vacuum Pump Oil", "unit_price": "23.00", "discount": "3.00", "category_id": 4, "brand_id": 6, "description": "Vacuum pump lubricant", "created_by": 1, "images": [{ "image_id": 18, "image_name": "vacuum.png", "image_url": "https://images.unsplash.com/photo-1581091012184-7e0cdfbb6793" }], "attributes": [{ "attr_name": "use", "attr_values": ["Vacuum Pump"] }] },
        { "item_id": 19, "item_code": "202601246610", "item_name": "Two Stroke Oil", "unit_price": "11.00", "discount": "1.00", "category_id": 1, "brand_id": 1, "description": "2T engine oil", "created_by": 1, "images": [{ "image_id": 19, "image_name": "2t.png", "image_url": "https://images.unsplash.com/photo-1602872029708-84e5b2fda95f" }], "attributes": [{ "attr_name": "engine", "attr_values": ["2 Stroke"] }] },
        { "item_id": 20, "item_code": "202601246611", "item_name": "Marine Oil", "unit_price": "40.00", "discount": "7.00", "category_id": 5, "brand_id": 7, "description": "Marine engine oil", "created_by": 1, "images": [{ "image_id": 20, "image_name": "marine.png", "image_url": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" }], "attributes": [{ "attr_name": "use", "attr_values": ["Marine"] }] }
    ],
    "current_page": 1,
    "per_page": 10,
    "total": 20,
    "last_page": 2,
    "from": 1,
    "to": 10
}

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
        <div className="p-4 md:p-8 bg-white dark:bg-gray-900 dark:text-gray-200 min-h-screen">
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