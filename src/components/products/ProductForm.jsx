import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import {
    BsPlusLg, BsTrash, BsCloudUpload, BsXCircle,
    BsSave, BsArrowLeft, BsCheck2Circle
} from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router';
import api from '../../services/api';
import { useAlert } from '../../hooks/AlertContext';


const ProductFormPage = ({ initialData = null }) => {
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const [imageId, setImageId] = useState([]);
    const navigater = useNavigate();
    const alert = useAlert();
    const queryClient = useQueryClient();
    // 1. Initial State
    const [data, setData] = useState({
        item_name: '',
        category_id: '',
        brand_id: '',
        unit_price: '',
        discount: '0',
        description: '',
        attributes: [{ name: '', value: '' }],
        images: [] // Mixed: string URLs (existing) or File objects (new)
    });
    const fetchApi = async ({ queryKey }) => {
        const [_key, page] = queryKey; // extract page from queryKey
        const res = await api.get(`${_key}?limit=10&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.data;
    };
    const fetchItemApi = async ({ queryKey }) => {
        const [_key] = queryKey; // extract page from queryKey
        const res = await api.get(`${_key}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.data;
    };
    const { data: categories } = useQuery({
        queryKey: ['categorys', page], // include page here
        queryFn: fetchApi,
        keepPreviousData: true, // smooth pagination
        staleTime: 5000,
    });
    const { data: brands } = useQuery({
        queryKey: ['brands', page], // include page here
        queryFn: fetchApi,
        keepPreviousData: true, // smooth pagination
        staleTime: 5000,
    });
    const { data: item } = useQuery({
        queryKey: ['products', 'update'], // include page here
        queryFn: fetchItemApi,
        keepPreviousData: true, // smooth pagination
        staleTime: 5000,
    });

    // 2. Attribute Logic
    const [attrOptions, setAttrOptions] = useState(['size', 'color', 'material', 'brand_origin']);
    const [isAddingNewAttrType, setIsAddingNewAttrType] = useState(null); // stores index

    // Load data if editing
    useEffect(() => {
        if (initialData) {
            setData(initialData);
        }
    }, [initialData]);
    useEffect(() => {
        if (item && id) {
            setData({
                item_name: item.item_name,
                category_id: item.category_id,
                brand_id: item.brand_id,
                unit_price: item.unit_price,
                discount: item.discount,
                description: item.description,
                attributes: item.attributes.map(att => ({ name: att.attr_name, value: att.attr_values.map(v => v).join(',') })),
                images: item.images.map(i => ({ file: null, preview: i.image_url, isNew: false, id: i.image_id }))
            })

        }
    }, [item]);
    console.log(data);


    // General Change Handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
        console.log(data?.images.map(i => i.file));

    };

    // Dynamic Attributes Handlers
    const addAttributeRow = () => {
        setData(prev => ({
            ...prev,
            attributes: [...prev.attributes, { name: '', value: '' }]
        }));
    };

    const updateAttribute = (index, field, value) => {
        const updated = [...data.attributes];
        updated[index][field] = value;
        setData(prev => ({ ...prev, attributes: updated }));
    };

    const handleAddNewOption = (index, value) => {
        if (!attrOptions.includes(value)) {
            setAttrOptions(prev => [...prev, value]);
        }
        updateAttribute(index, 'name', value);
        setIsAddingNewAttrType(null);
    };

    // Image Handlers
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            isNew: true
        }));

        setData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    };

    const removeImage = (index) => {
        const image = data.images.find((_, i) => i == index);
        console.log(image);

        setData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
        image?.id && setImageId(prev => [...prev, image.id])
    };

    const ProductApi = async (data) => {
        const formData = new FormData();
        formData.append('item_name', data?.item_name);
        formData.append('category_id', data?.category_id);
        formData.append('brand_id', data?.brand_id);
        formData.append('unit_price', data?.unit_price);
        formData.append('discount', data?.discount);
        formData.append('description', data?.description);
        formData.append('imageId', JSON.stringify(imageId));
        formData.append('attributes', JSON.stringify(data?.attributes));
        data?.images.forEach((file, index) => {
            formData.append('images[]', file.file); // IMPORTANT: images[]
        });
        let res;
        if (id) {
            res = await api.post(`product/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        } else {

            res = await api.post('products', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        }
        return res.data
    }

    const { mutate: createProduct, isPending } = useMutation({
        mutationKey: ['products', 'create'],
        mutationFn: ProductApi,

        onSuccess: () => {
            setTimeout(() => {
                alert.success('Product created successful', 'Create Product', {
                    duration: 1000,
                })
            }, 200)
            queryClient.invalidateQueries({ queryKey: ['products'] });
            navigater('/products');
        },

        onError: (err) => {
            setTimeout(() => {
                alert.error('Product created failed', 'Create Product', {
                    duration: 1000,
                })
            }, 200)
            console.error(err?.response?.data || err.message);
        },
    });
    const { mutate: updateProduct } = useMutation({
        mutationKey: ['products', 'update'],
        mutationFn: ProductApi,

        onSuccess: () => {
            setTimeout(() => {
                alert.success('Product updated successful', 'Create Product', {
                    duration: 1000,
                    position: 'top-center',
                })
            }, 200)
            queryClient.invalidateQueries({ queryKey: ['products'] });
            navigater('/products');
        },

        onError: (err) => {
            setTimeout(() => {
                alert.error('Product updated failed', 'Create Product', {
                    duration: 1000,
                })
            }, 200)
            console.error(err?.response?.data || err.message);
        },
    });

    const handleSubmit = () => {
        console.log(data);
        id ? updateProduct(data) : createProduct(data);

    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-10 dark:text-gray-200 bg-transparent min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <button onClick={() => navigater(-1)} className="flex items-center gap-2 text-indigo-600 font-semibold mb-2 hover:underline">
                        <BsArrowLeft /> Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold">
                        {id ? `Edit Product: ${data.item_name}` : 'Create New Product'}
                    </h1>
                </div>
                <button onClick={handleSubmit} className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95">
                    <BsSave /> {id ? 'Update Product' : 'Save Product'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Product Info */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                            General Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Item Name</label>
                                <input name="item_name" value={data?.item_name} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-transparent border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. Jordan Air Force 1" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Category</label>
                                <select
                                    value={data?.category_id}
                                    name='category_id'
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 rounded-lg outline-none"
                                >
                                    <option value="">Select here</option>
                                    {categories?.data?.map(opt => <option key={opt.category_id} value={opt.category_id}>{opt.category_name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Brand</label>
                                <select
                                    value={data?.brand_id}
                                    name='brand_id'
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 rounded-lg outline-none"
                                >
                                    <option value="">Select here</option>
                                    {brands?.data?.map(opt => <option key={opt.brand_id} value={opt.brand_id}>{opt.brand_name}</option>)}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Description</label>
                                <textarea name="description" value={data?.description} onChange={handleChange} rows="4" className="w-full px-4 py-3 bg-gray-50 dark:bg-transparent border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Product details..."></textarea>
                            </div>
                        </div>
                    </section>

                    {/* Dynamic Attributes */}
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                                <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                                Product Attributes
                            </h2>
                            <button onClick={addAttributeRow} className="flex items-center gap-2 text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
                                <BsPlusLg /> Add More
                            </button>
                        </div>

                        <div className="space-y-4">
                            {data?.attributes?.map((attr, idx) => (
                                <div key={idx} className="group flex flex-wrap md:flex-nowrap gap-4 items-end bg-gray-50 dark:bg-transparent p-4 rounded-xl relative border border-transparent hover:border-indigo-200 transition-all">
                                    <div className="flex-1 min-w-[150px]">
                                        <label className="text-[10px] uppercase font-black text-gray-400 mb-1 block">Attribute Key</label>
                                        {isAddingNewAttrType === idx ? (
                                            <div className="flex gap-1">
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    placeholder="Type new name..."
                                                    className="w-full p-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                                    onKeyDown={(e) => e.key === 'Enter' && handleAddNewOption(idx, e.target.value)}
                                                />
                                            </div>
                                        ) : (
                                            <select
                                                value={attr.name}
                                                onChange={(e) => {
                                                    if (e.target.value === "NEW") setIsAddingNewAttrType(idx);
                                                    else updateAttribute(idx, 'name', e.target.value);
                                                }}
                                                className="w-full p-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 rounded-lg outline-none"
                                            >
                                                <option value="">Select Key</option>
                                                {attrOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                <option value="NEW" className="text-indigo-600 font-bold">+ Add New Key</option>
                                            </select>
                                        )}
                                    </div>

                                    <div className="flex-[2] min-w-[200px]">
                                        <label className="text-[10px] uppercase font-black text-gray-400 mb-1 block">Value</label>
                                        <input
                                            type="text"
                                            value={attr.value}
                                            onChange={(e) => updateAttribute(idx, 'value', e.target.value)}
                                            className="w-full p-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 rounded-lg outline-none"
                                            placeholder="e.g. XL, Blue, 100% Cotton"
                                        />
                                    </div>

                                    <button
                                        onClick={() => setData(p => ({ ...p, attributes: p.attributes.filter((_, i) => i !== idx) }))}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <BsTrash size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right: Pricing & Media */}
                <div className="space-y-6">
                    {/* Pricing Card */}
                    <section className="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            Pricing Details
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-indigo-300 uppercase mb-1">Unit Price ($)</label>
                                <input name="unit_price" value={data?.unit_price} onChange={handleChange} type="number" className="w-full bg-indigo-800/50 border border-indigo-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-indigo-300 uppercase mb-1">Discount ($)</label>
                                <input name="discount" value={data?.discount} onChange={handleChange} type="number" className="w-full bg-indigo-800/50 border border-indigo-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400" />
                            </div>
                        </div>
                    </section>

                    {/* Media Upload */}
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold text-gray-700 mb-4">Media Assets</h2>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {data?.images.map((img, idx) => (
                                <div key={idx} className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
                                    <img src={img.preview || img.image_name} alt="" className="w-full h-full object-cover" />
                                    <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                        <BsXCircle size={14} />
                                    </button>
                                </div>
                            ))}
                            <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition-all group">
                                <BsCloudUpload size={24} className="text-gray-300 group-hover:text-indigo-500" />
                                <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Upload</span>
                                <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
                            </label>
                        </div>
                        <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">Max file size 5MB</p>
                    </section>
                </div>

            </div>
        </div>
    );
};

export default ProductFormPage;