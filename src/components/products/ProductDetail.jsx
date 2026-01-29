import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
    BsArrowLeft,
    BsTag,
    BsBoxSeam,
    BsInfoCircle,
    BsCurrencyDollar
} from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router';
import api from '../../services/api';
import AlertQuestionBox from '../../services/AlertQuestionBox';
import items from '../../data/product';
const item = {
    "success": true,
    "message": "Item list retrieved successfully",
    "data": {
        "current_page": 1,
        "data": [
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
                    },
                    {
                        "image_id": 7,
                        "image_name": "steering.png",
                        "image_url": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7"
                    }
                ],
                "attributes": [
                    { "attr_name": "type", "attr_values": ["Automatic"] }
                ]
            },
        ],
        "first_page_url": "http://127.0.0.1:8000/api/sale-items?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://127.0.0.1:8000/api/sale-items?page=1",
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "page": null,
                "active": false
            },
            {
                "url": "http://127.0.0.1:8000/api/sale-items?page=1",
                "label": "1",
                "page": 1,
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "page": null,
                "active": false
            }
        ],
        "next_page_url": null,
        "path": "http://127.0.0.1:8000/api/sale-items",
        "per_page": 10,
        "prev_page_url": null,
        "to": 1,
        "total": 1
    },
    "current_page": 1,
    "per_page": 10,
    "total": 1,
    "last_page": 1,
    "from": 1,
    "to": 1,
    "links": [
        {
            "url": null,
            "label": "&laquo; Previous",
            "page": null,
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/api/sale-items?page=1",
            "label": "1",
            "page": 1,
            "active": true
        },
        {
            "url": null,
            "label": "Next &raquo;",
            "page": null,
            "active": false
        }
    ]
}

const ProductViewPage = () => {
    const { id } = useParams();
    const navigater = useNavigate();
    const [product, setProduct] = useState();
    const token = localStorage.getItem('token');
    const [selectedImage, setSelectedImage] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [delId, setDelId] = useState(false);
    const queryClient = useQueryClient();

    const fetchProductById = async ({ queryKey }) => {
        const [, id] = queryKey; // ['products', id]

        const res = await api.get(`products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data.data;
    };

    // const {
    //     data,
    //     isPending,
    //     isError,
    //     error,
    // } = useQuery({
    //     queryKey: ['product', id],
    //     queryFn: fetchProductById,
    //     enabled: !!id, // prevent run when id is undefined
    // });
    const item = items.data.find(i=>i.item_id == id);
    const data = item; // Remove this line when using real data fetching

    useEffect(() => {
        if (data) {
            console.log(data);
            setProduct(data);
            setSelectedImage(data?.images[0]?.image_url || null);

        }
    }, [data]);

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


    function onBack() {
        navigater(-1);
    }
    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 dark:text-gray-200 bg-transparent">
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
            {/* Top Navigation */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-6 group"
            >
                <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to List</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left: Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 dark:bg-gray-200 rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt={product.item_name}
                                className="w-full h-full object-contain mix-blend-multiply"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Preview</div>
                        )}
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product?.images.map((img) => (
                            <button
                                key={img.image_id}
                                onClick={() => setSelectedImage(img.image_url)}
                                className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all ${selectedImage === img.image_url ? 'border-indigo-500 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                                    }`}
                            >
                                <img src={img.image_url} alt="thumb" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
                            Code: {product?.item_code}
                        </span>
                        <h1 className="text-4xl font-extrabold mb-2">{product?.item_name}</h1>
                        <p className="text-gray-500 flex items-center gap-2">
                            <BsTag /> Category: {product?.category_id} | Brand: {product?.brand_id}
                        </p>
                    </div>

                    <hr className="border-gray-100 mb-6" />

                    {/* Pricing Card */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl mb-8 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Unit Price</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold ">${product?.unit_price}</span>
                                {parseFloat(product?.discount) > 0 && (
                                    <span className="text-lg text-red-500 line-through">
                                        ${(parseFloat(product?.unit_price) + parseFloat(product?.discount)).toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>
                        {parseFloat(product?.discount) > 0 && (
                            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold text-sm">
                                Save ${product?.discount}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                            <BsInfoCircle className="text-indigo-500" /> Description
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {product?.description || "No description provided for this item."}
                        </p>
                    </div>

                    {/* Attributes */}
                    <div className="mb-8">
                        <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                            <BsBoxSeam className="text-indigo-500" /> Specifications
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {product?.attributes.map((attr) => (
                                <div key={attr.attr_id} className="border border-gray-100 dark:border-gray-700 rounded-xl p-3 bg-white dark:bg-gray-800 shadow-sm">
                                    <p className="text-xs text-gray-400 uppercase font-bold">{attr.attr_name}</p>
                                    <div className='flex gap-3 items-center flex-wrap'>{attr?.attr_values?.map(value => <p className="font-medium">{value}</p>)}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-auto pt-6 flex gap-4 border-t border-gray-100">
                        <button onClick={() => navigater(`/products/edit/${id}`)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg">
                            Edit Item
                        </button>
                        <button onClick={() => handleDel(id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg">
                            Delete
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductViewPage;