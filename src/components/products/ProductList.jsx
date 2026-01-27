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
            "item_code": "MM20260001",
            "item_name": "Coca Cola Can",
            "unit_price": "1.20",
            "discount": "0.10",
            "category_id": 1,
            "brand_id": 1,
            "description": "Refreshing soft drink",
            "created_by": 1,
            "images": [
                {
                    "image_id": 1,
                    "image_name": "coke-can.jpg",
                    "image_url": "https://images.unsplash.com/photo-1580910051074-3eb694886505"
                }
            ],
            "attributes": [
                {
                    "attr_name": "size",
                    "attr_values": ["330ml"]
                }
            ]
        },
        {
            "item_id": 2,
            "item_code": "MM20260002",
            "item_name": "Pepsi Bottle",
            "unit_price": "1.50",
            "discount": "0.15",
            "category_id": 1,
            "brand_id": 2,
            "description": "Carbonated soft drink",
            "created_by": 1,
            "images": [
                {
                    "image_id": 2,
                    "image_name": "pepsi.jpg",
                    "image_url": "https://images.unsplash.com/photo-1613478223719-2ab802602423"
                }
            ],
            "attributes": [
                {
                    "attr_name": "size",
                    "attr_values": ["500ml"]
                }
            ]
        },
        {
            "item_id": 3,
            "item_code": "MM20260003",
            "item_name": "Mineral Water",
            "unit_price": "0.80",
            "discount": "0.00",
            "category_id": 1,
            "brand_id": 3,
            "description": "Pure drinking water",
            "created_by": 1,
            "images": [
                {
                    "image_id": 3,
                    "image_name": "water.jpg",
                    "image_url": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d"
                }
            ],
            "attributes": [
                {
                    "attr_name": "size",
                    "attr_values": ["600ml"]
                }
            ]
        },
        {
            "item_id": 4,
            "item_code": "MM20260004",
            "item_name": "Lay's Potato Chips",
            "unit_price": "2.00",
            "discount": "0.20",
            "category_id": 2,
            "brand_id": 4,
            "description": "Crispy potato chips",
            "created_by": 1,
            "images": [
                {
                    "image_id": 4,
                    "image_name": "chips.jpg",
                    "image_url": "https://images.unsplash.com/photo-1585238342028-4bbc9c6d1c08"
                }
            ],
            "attributes": [
                {
                    "attr_name": "flavor",
                    "attr_values": ["Original"]
                }
            ]
        },
        {
            "item_id": 5,
            "item_code": "MM20260005",
            "item_name": "Oreo Cookies",
            "unit_price": "1.80",
            "discount": "0.10",
            "category_id": 2,
            "brand_id": 5,
            "description": "Chocolate cream cookies",
            "created_by": 1,
            "images": [
                {
                    "image_id": 5,
                    "image_name": "oreo.jpg",
                    "image_url": "https://images.unsplash.com/photo-1599785209798-7e6a6c5b09b8"
                }
            ],
            "attributes": [
                {
                    "attr_name": "pack",
                    "attr_values": ["12 pcs"]
                }
            ]
        },
        {
            "item_id": 6,
            "item_code": "MM20260006",
            "item_name": "Instant Noodles",
            "unit_price": "0.50",
            "discount": "0.05",
            "category_id": 3,
            "brand_id": 6,
            "description": "Quick meal noodles",
            "created_by": 1,
            "images": [
                {
                    "image_id": 6,
                    "image_name": "noodles.jpg",
                    "image_url": "https://images.unsplash.com/photo-1604909053197-5c2c2b3d5e2d"
                }
            ],
            "attributes": [
                {
                    "attr_name": "flavor",
                    "attr_values": ["Chicken"]
                }
            ]
        },
        {
            "item_id": 7,
            "item_code": "MM20260007",
            "item_name": "Fresh Milk",
            "unit_price": "1.30",
            "discount": "0.10",
            "category_id": 4,
            "brand_id": 7,
            "description": "Dairy fresh milk",
            "created_by": 1,
            "images": [
                {
                    "image_id": 7,
                    "image_name": "milk.jpg",
                    "image_url": "https://images.unsplash.com/photo-1580910051074-1c4c2b78b6c2"
                }
            ],
            "attributes": [
                {
                    "attr_name": "fat",
                    "attr_values": ["Full Cream"]
                }
            ]
        },
        {
            "item_id": 8,
            "item_code": "MM20260008",
            "item_name": "White Bread",
            "unit_price": "1.10",
            "discount": "0.05",
            "category_id": 4,
            "brand_id": 8,
            "description": "Soft bakery bread",
            "created_by": 1,
            "images": [
                {
                    "image_id": 8,
                    "image_name": "bread.jpg",
                    "image_url": "https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
                }
            ],
            "attributes": [
                {
                    "attr_name": "weight",
                    "attr_values": ["400g"]
                }
            ]
        },


        // items 9–20 continue same pattern (rice, sugar, coffee, tea, eggs, soap, shampoo, toothpaste, tissue, cooking oil, salt, soy sauce)

        {
            "item_id": 9,
            "item_code": "MM20260009",
            "item_name": "Jasmine Rice",
            "unit_price": "12.00",
            "discount": "1.00",
            "category_id": 5,
            "brand_id": 9,
            "description": "Premium jasmine rice",
            "created_by": 1,
            "images": [
                {
                    "image_id": 9,
                    "image_name": "rice.jpg",
                    "image_url": "https://images.unsplash.com/photo-1604335399105-4ec7a6b2d6c5"
                }
            ],
            "attributes": [
                {
                    "attr_name": "weight",
                    "attr_values": ["5kg"]
                }
            ]
        },
        {
            "item_id": 10,
            "item_code": "MM20260010",
            "item_name": "White Sugar",
            "unit_price": "2.50",
            "discount": "0.20",
            "category_id": 5,
            "brand_id": 10,
            "description": "Refined white sugar",
            "created_by": 1,
            "images": [
                {
                    "image_id": 10,
                    "image_name": "sugar.jpg",
                    "image_url": "https://images.unsplash.com/photo-1587049352847-0bfe03b2e89d"
                }
            ],
            "attributes": [
                {
                    "attr_name": "weight",
                    "attr_values": ["1kg"]
                }
            ]
        },
        {
            "item_id": 11,
            "item_code": "MM20260011",
            "item_name": "Instant Coffee",
            "unit_price": "3.20",
            "discount": "0.30",
            "category_id": 6,
            "brand_id": 11,
            "description": "Strong instant coffee",
            "created_by": 1,
            "images": [
                {
                    "image_id": 11,
                    "image_name": "coffee.jpg",
                    "image_url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
                }
            ],
            "attributes": [
                {
                    "attr_name": "type",
                    "attr_values": ["Classic"]
                }
            ]
        },
        {
            "item_id": 12,
            "item_code": "MM20260012",
            "item_name": "Green Tea",
            "unit_price": "2.80",
            "discount": "0.20",
            "category_id": 6,
            "brand_id": 12,
            "description": "Healthy green tea",
            "created_by": 1,
            "images": [
                {
                    "image_id": 12,
                    "image_name": "tea.jpg",
                    "image_url": "https://images.unsplash.com/photo-1544787219-7f47ccb76574"
                }
            ],
            "attributes": [
                {
                    "attr_name": "pack",
                    "attr_values": ["20 bags"]
                }
            ]
        },
        {
            "item_id": 13,
            "item_code": "MM20260013",
            "item_name": "Chicken Eggs",
            "unit_price": "2.40",
            "discount": "0.10",
            "category_id": 7,
            "brand_id": 13,
            "description": "Fresh farm eggs",
            "created_by": 1,
            "images": [
                {
                    "image_id": 13,
                    "image_name": "eggs.jpg",
                    "image_url": "https://images.unsplash.com/photo-1587486913049-53fc88980cfc"
                }
            ],
            "attributes": [
                {
                    "attr_name": "quantity",
                    "attr_values": ["10 pcs"]
                }
            ]
        },
        {
            "item_id": 14,
            "item_code": "MM20260014",
            "item_name": "Bath Soap",
            "unit_price": "1.00",
            "discount": "0.05",
            "category_id": 8,
            "brand_id": 14,
            "description": "Gentle bath soap",
            "created_by": 1,
            "images": [
                {
                    "image_id": 14,
                    "image_name": "soap.jpg",
                    "image_url": "https://images.unsplash.com/photo-1607006344380-b6775a0824ce"
                }
            ],
            "attributes": [
                {
                    "attr_name": "scent",
                    "attr_values": ["Lemon"]
                }
            ]
        },
        {
            "item_id": 15,
            "item_code": "MM20260015",
            "item_name": "Shampoo",
            "unit_price": "3.50",
            "discount": "0.30",
            "category_id": 8,
            "brand_id": 15,
            "description": "Hair care shampoo",
            "created_by": 1,
            "images": [
                {
                    "image_id": 15,
                    "image_name": "shampoo.jpg",
                    "image_url": "https://images.unsplash.com/photo-1585232351009-aa87416fca90"
                }
            ],
            "attributes": [
                {
                    "attr_name": "volume",
                    "attr_values": ["400ml"]
                }
            ]
        },
        {
            "item_id": 16,
            "item_code": "MM20260016",
            "item_name": "Toothpaste",
            "unit_price": "2.00",
            "discount": "0.15",
            "category_id": 8,
            "brand_id": 16,
            "description": "Mint toothpaste",
            "created_by": 1,
            "images": [
                {
                    "image_id": 16,
                    "image_name": "toothpaste.jpg",
                    "image_url": "https://images.unsplash.com/photo-1619451427882-6aaaded0ccca"
                }
            ],
            "attributes": [
                {
                    "attr_name": "flavor",
                    "attr_values": ["Mint"]
                }
            ]
        },
        {
            "item_id": 17,
            "item_code": "MM20260017",
            "item_name": "Facial Tissue",
            "unit_price": "1.20",
            "discount": "0.10",
            "category_id": 9,
            "brand_id": 17,
            "description": "Soft facial tissue",
            "created_by": 1,
            "images": [
                {
                    "image_id": 17,
                    "image_name": "tissue.jpg",
                    "image_url": "https://images.unsplash.com/photo-1583947215259-38e31be8751f"
                }
            ],
            "attributes": [
                {
                    "attr_name": "ply",
                    "attr_values": ["2 ply"]
                }
            ]
        },
        {
            "item_id": 18,
            "item_code": "MM20260018",
            "item_name": "Cooking Oil",
            "unit_price": "4.50",
            "discount": "0.40",
            "category_id": 10,
            "brand_id": 18,
            "description": "Vegetable cooking oil",
            "created_by": 1,
            "images": [
                {
                    "image_id": 18,
                    "image_name": "oil.jpg",
                    "image_url": "https://images.unsplash.com/photo-1620807773206-49c1f2957417"
                }
            ],
            "attributes": [
                {
                    "attr_name": "volume",
                    "attr_values": ["1L"]
                }
            ]
        },
        {
            "item_id": 19,
            "item_code": "MM20260019",
            "item_name": "Salt",
            "unit_price": "0.60",
            "discount": "0.00",
            "category_id": 10,
            "brand_id": 19,
            "description": "Iodized salt",
            "created_by": 1,
            "images": [
                {
                    "image_id": 19,
                    "image_name": "salt.jpg",
                    "image_url": "https://images.unsplash.com/photo-1604908177225-1c3b7b0c9b8f"
                }
            ],
            "attributes": [
                {
                    "attr_name": "weight",
                    "attr_values": ["500g"]
                }
            ]
        },
        {
            "item_id": 20,
            "item_code": "MM20260020",
            "item_name": "Soy Sauce",
            "unit_price": "1.80",
            "discount": "0.10",
            "category_id": 10,
            "brand_id": 20,
            "description": "Classic soy sauce",
            "created_by": 1,
            "images": [
                {
                    "image_id": 20,
                    "image_name": "soy-sauce.jpg",
                    "image_url": "https://images.unsplash.com/photo-1617191518001-4c13b56c63a4"
                }
            ],
            "attributes": [
                {
                    "attr_name": "volume",
                    "attr_values": ["700ml"]
                }
            ]
        }


    ],
    "current_page": 1,
    "per_page": 10,
    "total": 20,
    "last_page": 2,
    "from": 1,
    "to": 10,
    "links": [
        {
            "url": null,
            "label": "&laquo; Previous",
            "page": null,
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/api/products?page=1",
            "label": "1",
            "page": 1,
            "active": true
        },
        {
            "url": "http://127.0.0.1:8000/api/products?page=2",
            "label": "2",
            "page": 2,
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/api/products?page=2",
            "label": "Next &raquo;",
            "page": 2,
            "active": false
        }
    ]
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