import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
    FaSearch, FaShoppingCart, FaTrash, FaPlus, FaMinus,
    FaFilter, FaTimes, FaCheckCircle, FaUserAlt
} from 'react-icons/fa';
import api from '../../services/api';
import { ImList, ImQrcode } from "react-icons/im";
import { useNavigate } from 'react-router';
import categories from '../../data/category';
import items from '../../data/product';





const SalePage = () => {
    // --- State ---
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [page, setPage] = useState(1);
    const [itemsData, setItemsData]= useState(items.data);
    const navigater = useNavigate();

    // POS Form State
    const [formData, setFormData] = useState({
        customer_id: '',
        payment_method: 'Cash',
        discount: 0,
        tax: 0,
        paymented: 0,
        payment_by: 'Walk-in',
        status: 1,
        online: false
    });

    const token = localStorage.getItem('token');
    const isLoading = false; // Replace with actual loading state from data fetching
    // --- Data Fetching ---
    // const { data: itemsData, isLoading } = useQuery({
    //     queryKey: ['sale-items', page, searchTerm, category, brand],
    //     queryFn: async () => {
    //         const res = await api.get(`sale-items?page=${page}&search=${searchTerm}&category=${category}&brand=${brand}`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         return res.data.data;
    //     }
    // });

    // --- Cart Logic ---
    const addToCart = (product) => {
        if (product.in_stock_qty <= 0) return alert("Out of stock!");

        setCart(prev => {
            const existing = prev.find(item => item.item_id === product.item_id);
            if (existing) {
                return prev.map(item =>
                    item.item_id === product.item_id
                        ? { ...item, quantity: Math.min(item.quantity + 1, product.in_stock_qty) }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1, unit_price: 10.00, discount: 0 }]; // Unit price as per your item structure
        });
        setIsCartOpen(true);
    };

    const updateQty = (id, delta) => {
        setCart(prev => prev.map(item =>
            item.item_id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeFromCart = (id) => setCart(prev => prev.filter(item => item.item_id !== id));

    // --- Calculations ---
    const subtotal = cart.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);
    const grandTotal = (subtotal - Number(formData.discount)) + Number(formData.tax);

    // --- Checkout Mutation ---
    const checkoutMutation = useMutation({
        mutationFn: (payload) => api.post('sales', payload, { headers: { Authorization: `Bearer ${token}` } }),
        onSuccess: () => {
            alert("Sale completed successfully!");
            setCart([]);
            setIsCartOpen(false);
        },
        onError: (err) => alert(err.response?.data?.message || "Checkout failed")
    });

    const handleCheckout = (e) => {
        e.preventDefault();
        if (!formData.customer_id) return alert("Please select a customer");
        if (cart.length === 0) return alert("Cart is empty");

        const payload = {
            ...formData,
            details: cart.map(item => ({
                item_id: item.item_id,
                quantity: item.quantity,
                unit_price: item.unit_price,
                discount: item.discount
            }))
        };
        checkoutMutation.mutate(payload);
    };
    // console.log(category);
    

    const handleCategory = (e)=>{
        const item = items.data.filter(i=>i.category_id==e.target.value);
        console.log(item);
        
        setItemsData(item);
        if(e.target.value == ''){
            setItemsData(items.data);
        }
    }
    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden dark:text-gray-200 lg:flex-row">
            {/* Main Content: Product List */}
            <div className="flex-1 flex flex-col overflow-hidden p-4 md:p-6">
                {/* Header Controls */}
                <div className="mb-6 space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Point of Sale</h1>
                        <div className='flex items-center justify-between w-full md:w-auto gap-3'>
                            <div className='flex'>
                                <ImQrcode title='Market' onClick={() => navigater('/market')} className=' cursor-pointer' />
                                <ImList title='Order List' onClick={() => navigater('/orders')} className=' ml-4 cursor-pointer' />
                            </div>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="xl:hidden relative p-3 bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg transition-colors"
                            >
                                <FaShoppingCart size={20} className="text-white" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                                        {cart.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                        <div className="relative col-span-1 lg:col-span-2">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                            <input
                                type="text" placeholder="Search by name or code..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border placeholder:text-gray-400 dark:placeholder:text-gray-500 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition-all shadow-sm"
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3 justify-between lg:col-span-2 md:justify-end">
                            <select
                                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                onClick={handleCategory}
                            >
                                <option value=''>All Categories</option>
                                {categories.data.data.map(c=>

                                <option value={c.category_id}>{c.category_name}</option>
                                )}
                            </select>
                            <select
                                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                onChange={(e) => setBrand(e.target.value)}
                            >
                                <option value="">All Brands</option>
                                <option value="1">Brand 1</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                            {[...Array(10)].map((_, i) => <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl"></div>)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                            {itemsData?.map((item) => (
                                <div
                                    key={item.item_id}
                                    onClick={() => addToCart(item)}
                                    className="bg-white dark:bg-gray-800 group rounded-2xl border border-gray-100 dark:border-gray-700 p-3 shadow-sm hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-600 transition-all cursor-pointer relative overflow-hidden"
                                >
                                    <div className="relative aspect-square mb-3 bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
                                        <img src={item.images[0]?.image_url} alt={item.item_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-gray-700 dark:text-gray-200 shadow-sm">
                                            Stock: {item.in_stock_qty}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-gray-800 dark:text-white text-sm truncate">{item.item_name}</h3>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-mono mb-2">{item.item_code}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-indigo-600 dark:text-indigo-400 font-black text-sm">$10.00</span>
                                        <button className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-600 transition-colors">
                                            <FaPlus size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Shopping Cart Drawer (Sidebar on LG, Slide-over on mobile) */}
            <div className={`
                fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-white dark:bg-gray-800 shadow-md transform transition-transform duration-300 xl:static xl:translate-x-0
                ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
                flex flex-col border-l border-gray-200 dark:border-gray-700
            `}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700">
                    <h2 className="font-black text-gray-800 dark:text-white flex items-center gap-2">
                        <FaShoppingCart className="text-indigo-600 dark:text-indigo-400" /> CART ({cart.length})
                    </h2>
                    <button onClick={() => setIsCartOpen(false)} className="xl:hidden p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 italic">
                            <FaShoppingCart size={40} className="mb-2 opacity-20" />
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.item_id} className="flex gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
                                <img src={item.images[0]?.image_url} className="w-16 h-16 rounded-lg object-cover" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-800 dark:text-white text-xs truncate">{item.item_name}</h4>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-black text-sm mb-2">${item.unit_price}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg px-2 py-1 gap-3">
                                            <button onClick={() => updateQty(item.item_id, -1)} className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"><FaMinus size={10} /></button>
                                            <span className="font-bold text-xs w-4 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                                            <button onClick={() => updateQty(item.item_id, 1)} className="text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><FaPlus size={10} /></button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.item_id)} className="text-red-400 dark:text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Checkout Section */}
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Customer *</label>
                            <div className="relative">
                                <FaUserAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 text-xs" />
                                <select
                                    required
                                    className="w-full pl-8 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                    value={formData.customer_id}
                                    onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
                                >
                                    <option value="">Select Customer</option>
                                    <option value="1">Walk-in Customer</option>
                                    <option value="2">John Doe</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Discount ($)</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                value={formData.discount}
                                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Tax ($)</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                value={formData.tax}
                                onChange={(e) => setFormData({ ...formData, tax: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2 py-2 border-t border-dashed border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-black text-gray-800 dark:text-white">
                            <span>Grand Total</span>
                            <span className="text-indigo-600 dark:text-indigo-400">${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={checkoutMutation.isPending || cart.length === 0}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-900 text-white py-4 rounded-2xl font-black uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                        {checkoutMutation.isPending ? "Processing..." : (
                            <><FaCheckCircle /> Complete Sale</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SalePage;