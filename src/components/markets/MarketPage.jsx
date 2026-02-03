import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
    FaSearch, FaShoppingCart, FaTrash, FaPlus, FaMinus,
    FaTimes, FaCheckCircle, FaUserAlt, FaChevronLeft, FaChevronRight,
    FaTag, FaStore
} from 'react-icons/fa';
import api from '../../services/api';
import { MdDarkMode, MdSunnySnowing } from 'react-icons/md';
import items from '../../data/product'
import { Outlet, useNavigate } from 'react-router';


const MarketSalePage = () => {
    // --- 1. Carousel & UI State ---
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigater = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');

    const posters = [
        { id: 1, title: "Grand Opening", discount: "20% Cashback", bg: "bg-gradient-to-r from-indigo-600 to-blue-500/0", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000" },
        { id: 2, title: "Flash Sale", discount: "Ends in 2h", bg: "bg-gradient-to-r from-rose-600 to-orange-500/0", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000" },
        { id: 3, title: "New Season", discount: "Explore Now", bg: "bg-gradient-to-r from-emerald-600 to-teal-500/0", image: "https://di-uploads-pod41.dealerinspire.com/performancefordbountiful/uploads/2023/09/PerF-Valet_Mobile-Ford-1900x200-1.png" },
    ];

    // --- 2. Cart & Form State ---
    const [cart, setCart] = useState([]);
    const [formData, setFormData] = useState({
        customer_id: '',
        payment_method: 'Cash',
        discount: 0,
        tax: 0,
        paymented: 0,
        payment_by: 'Cashier-01',
        status: 1,
        online: false
    });

    const token = localStorage.getItem('token');

    // Carousel Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === posters.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(timer);
    }, [posters.length]);

    // --- 3. Data Fetching ---
    // const { data: itemsData, isLoading } = useQuery({
    //     queryKey: ['sale-items', searchTerm, activeCategory],
    //     queryFn: async () => {
    //         const res = await api.get(`sale-items?search=${searchTerm}&category=${activeCategory}`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         return res.data.data;
    //     }
    // });
    const itemsData = items;
    const isLoading = false;

    // --- 4. Cart Operations ---
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
            return [...prev, { ...product, quantity: 1, unit_price: 10.0, discount: 0 }];
        });
    };

    const updateQty = (id, delta) => {
        setCart(prev => prev.map(item =>
            item.item_id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeFromCart = (id) => setCart(prev => prev.filter(item => item.item_id !== id));

    // --- 5. Calculation Logic ---
    const subtotal = cart.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);
    const grandTotal = (subtotal - Number(formData.discount)) + Number(formData.tax);

    // --- 6. Checkout Mutation ---
    const checkoutMutation = useMutation({
        mutationFn: (payload) => api.post('sales', payload, { headers: { Authorization: `Bearer ${token}` } }),
        onSuccess: () => {
            alert("Order Placed Successfully!");
            setCart([]);
            setIsCartOpen(false);
        },
        onError: (err) => alert(err.response?.data?.message || "Checkout Error")
    });

    const handleCheckout = (e) => {
        e.preventDefault();
        if (!formData.customer_id) return alert("Please select a customer first");
        if (cart.length === 0) return alert("Your cart is empty");

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

    const [mode, setMode] = useState(localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.add(mode);
    const darkmode = () => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        document.documentElement.classList.toggle(
            "dark",
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
        );
        // Whenever the user explicitly chooses light mode
        if (document.documentElement.classList.contains("dark")) {
            localStorage.theme = "light";
            setMode('dark');
        } else {
            localStorage.theme = "dark";
            setMode('light');
        }
    }

    return (
        <div className="flex h-screen bg-gray-200 dark:bg-gray-900 overflow-hidden lg:flex-row">

            {/* LEFT SIDE: MARKET AREA */}
            <main className="flex-1 flex flex-col overflow-hidden">

                {/* Search Header */}
                <header className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 drop-shadow-lg dark:border-gray-700 flex items-center justify-between gap-4 sticky top-0 z-30">
                    <div onClick={() => navigater('/market')} className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                        <FaStore size={24} />
                        <h1 className="text-xl font-black italic hidden sm:block">MARKET.PRO</h1>
                    </div>
                    <div className="relative flex-1 max-w-xl">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Find your items..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {mode === 'dark' ? <MdSunnySnowing onClick={darkmode} className='dark:text-white' /> :
                        <MdDarkMode onClick={darkmode} />}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-3 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 rounded-2xl"
                    >
                        <FaShoppingCart size={22} />
                        {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">{cart.length}</span>}
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 custom-scrollbar">
                    <Outlet />
                </div>
            </main>

            {/* RIGHT SIDE: CART DRAWER */}
            <aside className={`
                fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white dark:bg-gray-800 shadow-[-20px_0_50px_rgba(0,0,0,0.1)] 
                transform transition-transform duration-500 ease-in-out 
                ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
                flex flex-col
            `}>
                {/* Cart Header */}
                <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-700/50">
                    <div>
                        <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100">My Basket</h2>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase">{cart.length} Items Selected</p>
                    </div>
                    <button onClick={() => setIsCartOpen(false)} className=" p-3 bg-white dark:bg-gray-700 rounded-full shadow-sm text-gray-400 dark:text-gray-500 hover:text-rose-500">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-20">
                            <FaShoppingCart size={80} className="mb-4" />
                            <p className="font-black text-xl uppercase tracking-widest">Empty Cart</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.item_id} className="flex gap-4 p-4 rounded-3xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 hover:border-indigo-200 transition-colors">
                                <img src={item.images[0]?.image_url} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-black text-gray-800 dark:text-gray-100 truncate uppercase">{item.item_name}</p>
                                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-black mb-2">${item.unit_price}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 bg-white dark:bg-gray-600 rounded-xl px-3 py-1 shadow-sm border border-gray-100 dark:border-gray-500">
                                            <button onClick={() => updateQty(item.item_id, -1)} className="text-gray-400 dark:text-gray-500 hover:text-rose-500 transition-colors"><FaMinus size={10} /></button>
                                            <span className="text-xs font-black w-4 text-center dark:text-gray-100">{item.quantity}</span>
                                            <button onClick={() => updateQty(item.item_id, 1)} className="text-gray-400 dark:text-gray-500 hover:text-indigo-500 transition-colors"><FaPlus size={10} /></button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.item_id)} className="text-gray-300 hover:text-rose-500 transition-colors">
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Checkout Section & Form */}
                <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 space-y-4 shadow-[0_-20px_40px_rgba(0,0,0,0.03)]">
                    <div className="space-y-3">
                        {/* Customer Selection */}
                        <div className="relative">
                            <FaUserAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 text-xs" />
                            <select
                                required
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 dark:text-white rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold text-gray-700"
                                value={formData.customer_id}
                                onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
                            >
                                <option value="">Select Customer</option>
                                <option value="1">Walk-in Customer</option>
                                <option value="2">Loyalty Member (John)</option>
                            </select>
                        </div>

                        {/* Extra Fees Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-2">Discount ($)</label>
                                <input type="number" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 dark:text-white rounded-xl text-sm font-bold" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-2">Tax (%)</label>
                                <input type="number" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 dark:text-white rounded-xl text-sm font-bold" value={formData.tax} onChange={(e) => setFormData({ ...formData, tax: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* Total Summary */}
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-[2rem] space-y-2 border border-indigo-100 dark:border-indigo-900">
                        <div className="flex justify-between text-xs font-bold text-indigo-400 dark:text-indigo-300 px-2">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-2xl font-black text-indigo-900 dark:text-indigo-100 px-2">
                            <span>Total</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={checkoutMutation.isPending || cart.length === 0}
                        className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-300 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                        {checkoutMutation.isPending ? "Syncing..." : (
                            <><FaCheckCircle size={20} /> Confirm Order</>
                        )}
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default MarketSalePage;